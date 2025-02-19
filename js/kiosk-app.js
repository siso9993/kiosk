/*************************************************************
 * kiosk-app.js
 * 
 * Example script to handle:
 * - Screen navigation
 * - Bottom nav highlighting
 * - Modal messages
 * - On-screen keyboard (optional)
 * - Registration / SMS verification
 * - New order flow
 *************************************************************/

// Current language is set globally (e.g. default to 'sk')
window.currentLanguage = window.currentLanguage || 'sk';

// We keep a reference for modal callbacks
let messageModalCallback = null;

// On-screen keyboard active input
let activeInputId = null;

/** 
 * On DOM ready:
 *  1. Set language
 *  2. Possibly highlight default screen in bottom nav
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize with the default language
  setLanguage(window.currentLanguage);

  // If your default screen is "homeScreen", highlight it if user is logged in
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
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
  }

  // Update bottom nav highlight if user is logged in
  // (If not logged in, the bottom nav might be hidden anyway)
  updateBottomNav(screenId);
}

function navigateHome() {
  navigateTo('homeScreen');
}

/**
 * Highlights the correct icon/text in the bottom nav based on screenId.
 * Adjust the screen IDs and nav item order as you prefer.
 */
function updateBottomNav(screenId) {
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Example logic: match screen IDs to nav indexes
  let navToHighlight = null;

  switch (screenId) {
    case 'homeScreen':
      // 1st nav item is "Home"
      navToHighlight = navItems[0];
      break;
    case 'newOrderScreen':
      // 2nd nav item is "New Order"
      navToHighlight = navItems[1];
      break;
    case 'mapScreen':
      // 3rd nav item is "Map"
      navToHighlight = navItems[2];
      break;
    case 'mainMenuScreen':
      // 4th nav item is "Profile" (or main menu)
      navToHighlight = navItems[3];
      break;
    default:
      // No highlight or do fallback
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

/** 
 * Example function for typed keys:
 * You might have a custom UI with buttons that call typeKey('A'), etc.
 */
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
  // In a real app, we’d verify code via server
  if (enteredCode === "0000") {
    showMessage("Telefónne číslo bolo úspešne overené.", () => {
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

// For demonstration, we generate a random 6-digit code
let generatedOrderCode = "";
function generateOrderCode() {
  generatedOrderCode = (Math.floor(100000 + Math.random() * 900000)).toString();
  showMessage("Objednávka dokončená! Kód: " + generatedOrderCode, () => {
    // Return to home or show an "order completed" screen
    navigateTo('homeScreen');
  });
}

/*************************************************************
 * OTHER EXAMPLE HANDLERS
 *************************************************************/
/** Example placeholders for order history, ongoing orders, etc. */
function loadOrderHistory() {
  // If you have an API or local list, fetch them and populate #orderHistoryList
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
