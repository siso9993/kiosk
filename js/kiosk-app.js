/*************************************************************
 * kiosk-app.js
 *
 * Handles:
 * - Screen navigation
 * - Bottom nav highlighting
 * - Modal messages
 * - On-screen keyboard (optional)
 * - Registration / SMS verification
 * - New order flow
 * - Rotating home animations (optional)
 *************************************************************/

// Current language is set globally (e.g. default to 'sk')
window.currentLanguage = window.currentLanguage || 'sk';

// We keep a reference for modal callbacks
let messageModalCallback = null;

// On-screen keyboard active input
let activeInputId = null;

/*************************************************************
 * HOME SCREEN ANIMATION ROTATION (Optional)
 *************************************************************/
const homeAnimations = [
  "assets/lottie/zadanie-objednavky.json",
  "assets/lottie/vlozeniie-do-skrinky.json",
  "assets/lottie/cakanie-na-pradlo.json",
  "assets/lottie/pickup.json",
  "assets/lottie/pracovna.json",
  "assets/lottie/notofikacia-pre-vyzdvihnutie.json",
  "assets/lottie/platba.json",
  "assets/lottie/objednavka-kompletna.json"
];

let homeAnimationLabels = [
  "Jednoducho zadáte objednávku priamo TU alebo cez WEB/APP",
  "Prádlo vložíte do pridelenej skrinky",
  "Teraz už neostáva nič len počkať",
  "Prádlo vyzdvihneme a dodáme do práčovne",
  "V práčovni ho operieme, vysušíme, ožehlíme a zložíme",
  "Budete informovaný SMS alebo notifikáciou",
  "Pred vyzdvihnutím zaplatíte tu alebo v aplikácii",
  "Vyzdvihnete čisté prádlo z boxu"
];

let currentHomeAnimIndex = 0;

function startRotatingHomeAnimations() {
  const homeLottieEl = document.getElementById("homeLottie");
  if (!homeLottieEl) return;
  
  // Načíta prvú animáciu
  homeLottieEl.load(homeAnimations[currentHomeAnimIndex]);
  
  const tooltipEl = document.getElementById("homeAnimationTooltip");
  if (tooltipEl) {
    tooltipEl.textContent = homeAnimationLabels[currentHomeAnimIndex] || "";
  }
  
  homeLottieEl.addEventListener("complete", () => {
    currentHomeAnimIndex++;
    if (currentHomeAnimIndex >= homeAnimations.length) {
      currentHomeAnimIndex = 0;
    }
    homeLottieEl.load(homeAnimations[currentHomeAnimIndex]);
    homeLottieEl.play();
    
    if (tooltipEl) {
      tooltipEl.textContent = homeAnimationLabels[currentHomeAnimIndex] || "";
    }
  });
}

/*************************************************************
 * DOMContentLoaded
 *************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  // Inicializácia jazyka
  setLanguage(window.currentLanguage);
  
  // Spustenie rotujúcich home animácií (ak je to požadované)
  startRotatingHomeAnimations();
  
  // Zvýraznenie defaultnej obrazovky v dolnej navigácii (homeScreen)
  updateBottomNav('homeScreen');
});

/*************************************************************
 * LANGUAGE & TRANSLATIONS
 *************************************************************/
function setLanguage(lang) {
  window.currentLanguage = lang;
  if (typeof updateTranslations === 'function') {
    updateTranslations();
  }
  console.log("Language switched to:", lang);
}

/*************************************************************
 * SCREEN NAVIGATION
 *************************************************************/
// Definícia obrazoviek, ktoré vyžadujú prihlásenie
const protectedScreens = ['newOrderScreen', 'mapScreen', 'profileScreen', 'mainMenuScreen', 'lockerLocationScreen', 'orderConfirmationScreen'];

function navigateTo(screenId) {
  // Ak je cieľová obrazovka chránená a používateľ nie je prihlásený,
  // zobrazí sa hlásenie a používateľ bude presmerovaný na prihlasovaciu obrazovku.
  if (protectedScreens.includes(screenId) && !isLoggedIn) {
    showMessage("Pre túto funkciu sa musíte prihlásiť.", () => {
      navigateTo('loginScreen');
    });
    return;
  }
  
  // Skrytie všetkých obrazoviek
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Zobrazenie cieľovej obrazovky
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }
  
  // Aktualizácia dolnej navigácie
  updateBottomNav(screenId);
  
  // Ak prebehlo prihlásenie, môžeme prepnúť obsah domovskej obrazovky.
  // Napríklad, ak používateľ prešiel na mainMenuScreen, zobrazíme len tlačidlá:
  // "Nová objednávka", "Moje objednávky", "Mapa" (podľa požiadavky).
  if (screenId === 'homeScreen' && isLoggedIn) {
    // Nahradíme obsah homeScreen po prihlásení – len tlačidlá prístupné registrovanému používateľovi.
    const homeScreen = document.getElementById('homeScreen');
    if (homeScreen) {
      homeScreen.innerHTML = `
        <h1>Domov</h1>
        <button onclick="navigateTo('newOrderScreen')">
          <i class="fa-solid fa-plus-circle"></i> Nová objednávka
        </button>
        <button onclick="navigateTo('orderHistoryScreen')">
          <i class="fa-solid fa-history"></i> Moje objednávky
        </button>
        <button onclick="navigateTo('mapScreen')">
          <i class="fa-solid fa-map"></i> Mapa
        </button>
      `;
    }
  }
}

function navigateHome() {
  navigateTo('homeScreen');
}

/** 
 * Zvýrazní správnu položku v dolnej navigácii podľa screenId 
 * Mapovanie: 0 - Domov, 1 - Objednávka, 2 - Mapa, 3 - Profil
 */
function updateBottomNav(screenId) {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  let navToHighlight = null;
  switch (screenId) {
    case 'homeScreen':
      navToHighlight = navItems[0];
      break;
    case 'newOrderScreen':
      navToHighlight = navItems[1];
      break;
    case 'mapScreen':
      navToHighlight = navItems[2];
      break;
    case 'profileScreen':
    case 'mainMenuScreen':
      navToHighlight = navItems[3];
      break;
    default:
      break;
  }
  if (navToHighlight) {
    navToHighlight.classList.add('active');
  }
}

/*************************************************************
 * MODAL MESSAGES
 *************************************************************/
function showMessage(msg, callback) {
  const modal = document.getElementById('messageModal');
  const msgElem = document.getElementById('modalMessage');
  if (!modal || !msgElem) return;
  
  msgElem.textContent = msg;
  modal.style.display = 'flex';
  
  messageModalCallback = callback || null;
}

function closeModalMessage() {
  const modal = document.getElementById('messageModal');
  if (!modal) return;
  
  modal.style.display = 'none';
  if (messageModalCallback) {
    messageModalCallback();
    messageModalCallback = null;
  }
}

/*************************************************************
 * ON-SCREEN KEYBOARD (OPTIONAL)
 *************************************************************/
function openKeyboardForInput(inputId) {
  activeInputId = inputId;
  const keyboard = document.getElementById('keyboard');
  if (keyboard) {
    keyboard.style.display = 'block';
  }
}

function typeKey(key) {
  if (!activeInputId) return;
  const inputEl = document.getElementById(activeInputId);
  if (!inputEl) return;
  
  if (key === 'Backspace') {
    inputEl.value = inputEl.value.slice(0, -1);
  } else {
    inputEl.value += key;
  }
}

function closeKeyboard() {
  const keyboard = document.getElementById('keyboard');
  if (keyboard) {
    keyboard.style.display = 'none';
  }
  activeInputId = null;
}

/*************************************************************
 * REGISTRATION & SMS VERIFICATION
 *************************************************************/
function sendSMSCodeForRegistration() {
  const phoneInput = document.getElementById('registerPhoneInput');
  if (!phoneInput) return;
  
  const phone = phoneInput.value.trim();
  if (!phone) {
    showMessage("Zadajte telefónne číslo!");
    return;
  }
  
  // Simulácia odoslania SMS kódu
  showMessage("SMS kód bol odoslaný na " + phone, () => {
    navigateTo('smsVerificationScreen');
  });
}

function verifySMSCode() {
  const codeInput = document.getElementById('smsCodeInput');
  if (!codeInput) return;
  
  const enteredCode = codeInput.value.trim();
  // Pre demo: kód je "0000"
  if (enteredCode === "0000") {
    showMessage("Telefónne číslo bolo úspešne overené.", () => {
      // Simulácia prihlásenia po úspešnej registrácii
      simulateLogin();
    });
  } else {
    showMessage("Nesprávny kód. Skúste to znova.");
  }
}

/*************************************************************
 * SIMULÁCIA PRIHLAŠOVANIA
 *************************************************************/
// Prihlasovacie údaje: používateľské meno: test, heslo: test
function loginUser() {
  const usernameInput = document.getElementById('loginUsername');
  const passwordInput = document.getElementById('loginPassword');
  
  if (!usernameInput || !passwordInput) return;
  
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  
  if (username === "test" && password === "test") {
    // Simulácia prihlásenia – presmerovanie so zmenou URL, čo nastaví isLoggedIn na true (prostredníctvom PHP)
    window.location.href = "?logged=1";
  } else {
    showMessage("Neplatné prihlasovacie údaje. Zadajte prosím 'test' / 'test'.");
  }
}

// Volaná po úspešnej SMS verifikácii, simuluje prihlásenie
function simulateLogin() {
  window.location.href = "?logged=1";
}

/*************************************************************
 * NEW ORDER FLOW
 *************************************************************/
let selectedService = null;

function selectService(service) {
  selectedService = service;
  showMessage("Vybrali ste si službu: " + service);
}

// Pre demo – vygeneruje náhodný 6-miestny objednávkový kód
let generatedOrderCode = "";
function generateOrderCode() {
  generatedOrderCode = (Math.floor(100000 + Math.random() * 900000)).toString();
  showMessage("Objednávka dokončená! Kód: " + generatedOrderCode, () => {
    navigateTo('orderConfirmationScreen');
    const codeEl = document.getElementById("orderCodeDisplay");
    const qrEl = document.getElementById("qrCodeDisplay");
    if (codeEl) codeEl.textContent = generatedOrderCode;
    if (qrEl) qrEl.textContent = "QR" + generatedOrderCode;
  });
}

/*************************************************************
 * OTHER EXAMPLE HANDLERS
 *************************************************************/
function loadOrderHistory() {
  const listElem = document.getElementById('orderHistoryList');
  if (listElem) {
    listElem.innerHTML = "<p>Žiadne objednávky.</p>";
  }
}

function loadOngoingOrders() {
  const listElem = document.getElementById('ongoingOrdersList');
  if (listElem) {
    listElem.innerHTML = "<p>Nie sú žiadne prebiehajúce objednávky.</p>";
  }
}
