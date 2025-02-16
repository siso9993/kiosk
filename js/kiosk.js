// kiosk.js

/***********************************************
 * GLOBAL & INITIAL ANIMATION SETUP
 ***********************************************/
let generatedOrderCode = "";
let generatedQRCode = "";
let smsCode = "";

// For the message modal
let messageModalCallback = null;

// For the on-screen keyboard
let activeInputId = null;

// HOME SCREEN ANIMÁCIE (rotating icons)
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
const homeAnimationLabels = [
  "Zadanie objednávky",
  "Vloženie do skrinky",
  "Čakanie na prádlo",
  "Vyzdvihnutie (Pickup)",
  "Pracovňa – spracovanie prádla",
  "Notifikácia pre vyzdvihnutie",
  "Platba",
  "Objednávka kompletná"
];
let currentHomeAnimIndex = 0;

window.addEventListener("DOMContentLoaded", () => {
  const homeLottiePlayer = document.getElementById("homeLottiePlayer");
  const tooltipEl = document.getElementById("homeAnimationTooltip");

  // Load first animation
  homeLottiePlayer.load(homeAnimations[currentHomeAnimIndex]);
  tooltipEl.innerText = homeAnimationLabels[currentHomeAnimIndex];

  // Rotate animations on complete
  homeLottiePlayer.addEventListener("complete", () => {
    currentHomeAnimIndex++;
    if (currentHomeAnimIndex >= homeAnimations.length) {
      currentHomeAnimIndex = 0;
    }
    homeLottiePlayer.load(homeAnimations[currentHomeAnimIndex]);
    homeLottiePlayer.play();
    tooltipEl.innerText = homeAnimationLabels[currentHomeAnimIndex];
  });

  // Show the right-panel pickup screen on load
  showPickupRightPanel();

  // Hide keyboard if clicking outside an input or the keyboard
  const kiosk = document.getElementById("kioskContainer");
  kiosk.addEventListener("click", (e) => {
    if (!e.target.closest("input") && !e.target.closest("#keyboard")) {
      closeKeyboard();
    }
  });
});

/***********************************************
 * MODAL MESSAGES (replaces alert)
 ***********************************************/
function showMessage(msg, callback) {
  const modal = document.getElementById("messageModal");
  const modalText = document.getElementById("modalMessage");
  modalText.innerText = msg;
  messageModalCallback = callback || null;
  modal.style.display = "flex";
}

function closeModalMessage() {
  const modal = document.getElementById("messageModal");
  modal.style.display = "none";
  if (messageModalCallback) {
    messageModalCallback();
    messageModalCallback = null;
  }
}

/***********************************************
 * ON-SCREEN KEYBOARD
 ***********************************************/
function openKeyboardForInput(inputId) {
  activeInputId = inputId;
  document.getElementById("keyboard").style.display = "block";
}

function typeKey(key) {
  if (!activeInputId) return;
  const inputEl = document.getElementById(activeInputId);
  if (key === "Backspace") {
    inputEl.value = inputEl.value.slice(0, -1);
  } else {
    inputEl.value += key;
  }
}

function keyboardBackspace() {
  typeKey("Backspace");
}

function closeKeyboard() {
  document.getElementById("keyboard").style.display = "none";
  activeInputId = null;
}

/***********************************************
 * NAVIGATION & PANELS
 ***********************************************/
function setLanguage(lang) {
  showMessage("Prepínam jazyk na: " + (lang === "sk" ? "Slovenčina" : "English"));
}

function navigateTo(screenId) {
  const screens = document.querySelectorAll("#screensContainer .screen");
  screens.forEach((screen) => screen.classList.remove("active"));

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }

  // If not on home-screen, show "returnHomeScreen" on the right panel
  if (screenId === "home-screen") {
    showPickupRightPanel();
  } else {
    showReturnHomeRightPanel();
  }
}
function navigateBack() {
  navigateTo("home-screen");
}
function navigateHome() {
  navigateTo("home-screen");
}

// RIGHT PANEL
function showPickupRightPanel() {
  document.getElementById("pickupScreen").classList.add("active");
  document.getElementById("returnHomeScreen").classList.remove("active");
}
function showReturnHomeRightPanel() {
  document.getElementById("pickupScreen").classList.remove("active");
  document.getElementById("returnHomeScreen").classList.add("active");
}

function startPickupProcess() {
  navigateTo("orderPickupPaymentScreen");
  showReturnHomeRightPanel();
}

/***********************************************
 * KIOSK LOGIC
 ***********************************************/
function sendSMSCode() {
  const phone = document.getElementById("phoneInput").value.trim();
  if (!phone) {
    showMessage("Zadajte telefónne číslo!");
    return;
  }
  showMessage("SMS kód bol odoslaný na číslo " + phone, () => {
    smsCode = "0000";
    navigateTo("smsVerificationScreen");
  });
}

function verifySMSCode() {
  const inputCode = document.getElementById("smsCodeInput").value.trim();
  if (inputCode === smsCode) {
    showMessage("Telefónne číslo bolo úspešne overené.", () => {
      navigateTo("serviceSelectionScreen");
    });
  } else {
    showMessage("Nesprávny kód. Skúste to znova.");
  }
}

function selectService(service) {
  showMessage("Vybrali ste službu: " + service, () => {
    navigateTo("weightMeasurementScreen");
  });
}

function startWeightMeasurement() {
  const progressBar = document.getElementById("weightProgress");
  progressBar.style.width = "0%";
  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 100);
  setTimeout(() => {
    const weight = (Math.random() * 5 + 1).toFixed(2);
    showMessage("Zmeraná hmotnosť: " + weight + " kg", () => {
      navigateTo("orderLockScreen");
    });
  }, 2100);
}

function generateOrderCode() {
  generatedOrderCode = Math.floor(100000 + Math.random() * 900000).toString();
  generatedQRCode = "QR" + generatedOrderCode;
  document.getElementById("generatingCode").classList.remove("blink");
  document.getElementById("orderCodeDisplay").innerText = generatedOrderCode;
  document.getElementById("qrCodeDisplay").innerText = generatedQRCode;
  navigateTo("orderReadyScreen");
}

function scanQRCode() {
  showMessage("Naskenovanie prebieha...", () => {
    navigateTo("orderLockScreen");
  });
}

function goToPaymentScreen() {
  navigateTo("paymentScreen");
}

// Payment
function startCardPayment() {
  showMessage("Platba kartou prebieha...");
}
function startContactlessPayment() {
  showMessage("Bezkontaktná platba prebieha...");
}

function sendInvoice() {
  const email = document.getElementById("invoiceEmailInput").value.trim();
  if (!email) {
    showMessage("Zadajte platný email!");
    return;
  }
  showMessage("Faktúra bola odoslaná na " + email, () => {
    navigateTo("lockerOpenScreen");
  });
}
