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

// Optional: Ak chcete pre každú animáciu iný text, môžete ho uložiť sem alebo do prekladov
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

/**
 * Initiates the rotating animations on the home screen.
 * Called once in DOMContentLoaded if you want the rotation.
 */
function startRotatingHomeAnimations() {
  const homeLottieEl = document.getElementById("homeLottie");
  if (!homeLottieEl) return; // Ak element neexistuje, skonči

  // Načíta prvú animáciu
  homeLottieEl.load(homeAnimations[currentHomeAnimIndex]);

  // Ak existuje element pre tooltip, nastaví text
  const tooltipEl = document.getElementById("homeAnimationTooltip");
  if (tooltipEl) {
    tooltipEl.textContent = homeAnimationLabels[currentHomeAnimIndex] || "";
  }

  // Po dokončení animácie načíta ďalšiu
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
  // 1) Inicializácia jazyka
  setLanguage(window.currentLanguage);

  // 2) Spustenie rotujúcich home animácií (ak je to požadované)
  startRotatingHomeAnimations();

  // 3) Zvýraznenie defaultnej obrazovky v dolnej navigácii (homeScreen, atď.)
  updateBottomNav('homeScreen');
});

/*************************************************************
 * LANGUAGE & TRANSLATIONS
 *************************************************************/
function setLanguage(lang) {
  window.currentLanguage = lang;
  // Volá updateTranslations() z translations-app.js, ak je definovaná
  if (typeof updateTranslations === 'function') {
    updateTranslations();
  }
  console.log("Language switched to:", lang);
}

/*************************************************************
 * SCREEN NAVIGATION
 *************************************************************/
function navigateTo(screenId) {
  // Skryje všetky obrazovky
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  // Zobrazí cieľovú obrazovku
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }

  // Aktualizuje zvýraznenie v dolnej navigácii
  updateBottomNav(screenId);
}

function navigateHome() {
  navigateTo('homeScreen');
}

/** 
 * Zvýrazní správnu položku v dolnej navigácii na základe screenId 
 * (Mapovanie: 0 - Domov, 1 - Objednávka, 2 - Mapa, 3 - Profil)
 */
function updateBottomNav(screenId) {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  let navToHighlight = null;
  switch (screenId) {
    case 'homeScreen':
      navToHighlight = navItems[0]; // Domov
      break;
    case 'newOrderScreen':
      navToHighlight = navItems[1]; // Objednávka
      break;
    case 'mapScreen':
      navToHighlight = navItems[2]; // Mapa
      break;
    case 'profileScreen':
    case 'mainMenuScreen':
      navToHighlight = navItems[3]; // Profil
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

  // Ak chceme po kliknutí na OK vykonať callback
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

  // Simulácia odoslania SMS
  showMessage("SMS kód bol odoslaný na " + phone, () => {
    // Prechod na ďalšiu obrazovku
    navigateTo('smsVerificationScreen');
  });
}

function verifySMSCode() {
  const codeInput = document.getElementById('smsCodeInput');
  if (!codeInput) return;

  const enteredCode = codeInput.value.trim();
  // V reálnom prostredí by sa kód overoval na serveri
  if (enteredCode === "0000") {
    showMessage("Telefónne číslo bolo úspešne overené.", () => {
      // Po úspešnom overení presuňte používateľa do hlavného menu
      navigateTo('mainMenuScreen');
    });
  } else {
    showMessage("Nesprávny kód. Skúste to znova.");
  }
}

/*************************************************************
 * NEW ORDER FLOW
 *************************************************************/
let selectedService = null;

/** 
 * Volané z tlačidiel výberu služby:
 *   <button onclick="selectService('Pranie + Sušenie + Zloženie')">...</button>
 */
function selectService(service) {
  selectedService = service;
  showMessage("Vybrali ste si službu: " + service);
}

// Pre demo – vygeneruje náhodný 6-miestny kód
let generatedOrderCode = "";
function generateOrderCode() {
  generatedOrderCode = (Math.floor(100000 + Math.random() * 900000)).toString();
  showMessage("Objednávka dokončená! Kód: " + generatedOrderCode, () => {
    // Prechod na obrazovku potvrdenia objednávky
    navigateTo('orderConfirmationScreen');
    // Zobrazenie kódu a QR v obrazovke potvrdenia
    const codeEl = document.getElementById("orderCodeDisplay");
    const qrEl = document.getElementById("qrCodeDisplay");
    if (codeEl) codeEl.textContent = generatedOrderCode;
    if (qrEl) qrEl.textContent = "QR" + generatedOrderCode; // placeholder pre QR kód
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
