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

// Optional: If you want different text for each animation, you can store them here or in translations
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
  if (!homeLottieEl) return; // If the element doesn't exist, skip

  // Load the first animation
  homeLottieEl.load(homeAnimations[currentHomeAnimIndex]);

  // If there's a text element for tooltips, set it
  const tooltipEl = document.getElementById("homeAnimationTooltip");
  if (tooltipEl) {
    tooltipEl.textContent = homeAnimationLabels[currentHomeAnimIndex] || "";
  }

  // When the animation completes, load the next
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
  // 1) Initialize language
  setLanguage(window.currentLanguage);

  // 2) Start rotating home animations (if desired)
  //    If you only want a single animation, remove the array logic above
  startRotatingHomeAnimations();

  // 3) Highlight default screen in bottom nav (homeScreen, etc.)
  updateBottomNav('homeScreen');
});

/*************************************************************
 * LANGUAGE & TRANSLATIONS
 *************************************************************/
function setLanguage(lang) {
  window.currentLanguage = lang;
  // Calls updateTranslations() from translations-app.js
  if (typeof updateTranslations === 'function') {
    updateTranslations();
  }
  console.log("Language switched to:", lang);
}

/*************************************************************
 * SCREEN NAVIGATION
 *************************************************************/
function navigateTo(screenId) {
  // Hide all .screen
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }

  // Update bottom nav highlight
  updateBottomNav(screenId);
}

function navigateHome() {
  navigateTo('homeScreen');
}

/** 
 * Highlights correct icon in bottom nav based on screenId 
 * Adjust this logic if your ID->Nav mapping differs
 */
function updateBottomNav(screenId) {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  let navToHighlight = null;
  // Example mapping
  switch (screenId) {
    case 'homeScreen':
      navToHighlight = navItems[0]; // the "home" nav
      break;
    case 'newOrderScreen':
      navToHighlight = navItems[1]; // the "order" nav
      break;
    case 'mapScreen':
      navToHighlight = navItems[2]; // the "map" nav
      break;
    case 'profileScreen':
    case 'mainMenuScreen':
      navToHighlight = navItems[3]; // the "profile" nav
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

  // If we want something to happen after user clicks OK
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

  // Simulate sending an SMS
  showMessage("SMS kód bol odoslaný na " + phone, () => {
    // Move to the next screen
    navigateTo('smsVerificationScreen');
  });
}

function verifySMSCode() {
  const codeInput = document.getElementById('smsCodeInput');
  if (!codeInput) return;

  const enteredCode = codeInput.value.trim();
  // In a real app, verify code via server
  if (enteredCode === "0000") {
    showMessage("Telefónne číslo bolo úspešne overené.", () => {
      // After verifying, you might set user as "logged in" on the server side
      // For this kiosk prototype, just go to main menu
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
 * Called from service selection buttons:
 *   <button onclick="selectService('Pranie + Sušenie + Zloženie')">...</button>
 */
function selectService(service) {
  selectedService = service;
  showMessage("Vybrali ste si službu: " + service);
}

// For demonstration, generate a random 6-digit code
let generatedOrderCode = "";
function generateOrderCode() {
  generatedOrderCode = (Math.floor(100000 + Math.random() * 900000)).toString();
  showMessage("Objednávka dokončená! Kód: " + generatedOrderCode, () => {
    // Return to home or show the "order completed" screen
    navigateTo('orderCompletionScreen');
    // Display the code in that screen's placeholders if needed
    const codeEl = document.getElementById("orderCodeDisplay");
    const qrEl = document.getElementById("qrCodeDisplay");
    if (codeEl) codeEl.textContent = generatedOrderCode;
    if (qrEl) qrEl.textContent = "QR" + generatedOrderCode; // placeholder
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
