/***********************************************
 * INITIALIZÁCIA JAZYKA
 ***********************************************/
// Nastavíme predvolený jazyk, ak ešte nie je definovaný
window.currentLanguage = window.currentLanguage || "sk";

/***********************************************
 * HELPER FUNCTIONS PRE TRANSLACIE
 ***********************************************/
function t(key, extra) {
  const lang = window.currentLanguage;
  let text = translations[lang] && translations[lang][key] ? translations[lang][key] : key;
  if (extra) {
    text = text.replace("%s", extra);
  }
  return text;
}

function updateTranslations() {
  // Aktualizácia vnútorného textu pre elementy s data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[window.currentLanguage] && translations[window.currentLanguage][key]) {
      el.innerText = translations[window.currentLanguage][key];
    }
  });
  // Aktualizácia placeholder atribútov
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[window.currentLanguage] && translations[window.currentLanguage][key]) {
      el.placeholder = translations[window.currentLanguage][key];
    }
  });
  // Aktualizácia rotujúcich animácií
  homeAnimationLabels = translations[window.currentLanguage].homeAnimationLabels || [];
}

/***********************************************
 * GLOBAL & INITIAL ANIMATION SETUP
 ***********************************************/
let generatedOrderCode = "";
let generatedQRCode = "";
let smsCode = "";

// Pre admin režimy
let adminLockerCount = 5;           // Simulovaný počet dostupných skriniek
let adminCurrentLockerIndex = 0;    // Index aktuálne vybratej skrinky
let adminSelectedLockers = [];      // Pole vybraných skriniek

// Pre modal správu
let messageModalCallback = null;

// Pre on-screen klávesnicu
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
// Načítame počiatočné rotujúce popisy z prekladov
let homeAnimationLabels = translations[window.currentLanguage].homeAnimationLabels || [];

let currentHomeAnimIndex = 0;

window.addEventListener("DOMContentLoaded", () => {
  // Ak by sa jazyk zmenil mimo, už máme predvolený jazyk "sk".
  updateTranslations();

  // Nastavenie rotujúcich ikon na Home Screen
  const homeLottiePlayer = document.getElementById("homeLottiePlayer");
  const tooltipEl = document.getElementById("homeAnimationTooltip");

  // Načíta sa prvá animácia
  homeLottiePlayer.load(homeAnimations[currentHomeAnimIndex]);
  tooltipEl.innerText = homeAnimationLabels[currentHomeAnimIndex];

  // Po dokončení animácie prepneme na ďalšiu
  homeLottiePlayer.addEventListener("complete", () => {
    currentHomeAnimIndex++;
    if (currentHomeAnimIndex >= homeAnimations.length) {
      currentHomeAnimIndex = 0;
    }
    homeLottiePlayer.load(homeAnimations[currentHomeAnimIndex]);
    homeLottiePlayer.play();
    tooltipEl.innerText = homeAnimationLabels[currentHomeAnimIndex];
  });

  // Štandardne zobrazíme "pickup" obrazovku v pravom paneli
  showPickupRightPanel();

  // Skrytie klávesnice, ak klikneme mimo input alebo klávesnice
  const kiosk = document.getElementById("kioskContainer");
  kiosk.addEventListener("click", (e) => {
    if (!e.target.closest("input") && !e.target.closest("#keyboard")) {
      closeKeyboard();
    }
  });
});

/***********************************************
 * MODAL SPRÁVY (nahrádza alert)
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
 * ON-SCREEN KLÁVESNICA
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
 * NAVIGÁCIA & PANELY
 ***********************************************/
function setLanguage(lang) {
  window.currentLanguage = lang;
  updateTranslations();
  showMessage(t("switchingLanguage") + (lang === "sk" ? "Slovenčina" : "English"));
}

function navigateTo(screenId) {
  const screens = document.querySelectorAll("#screensContainer .screen");
  screens.forEach((screen) => screen.classList.remove("active"));

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }

  // Ak ideme späť na home-screen, zobrazíme pravý panel s "pickup"
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

// PRAVÝ PANEL
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
 * KIOSK LOGIKA
 ***********************************************/
function sendSMSCode() {
  const phone = document.getElementById("phoneInput").value.trim();
  if (!phone) {
    showMessage(t("invalidPhone"));
    return;
  }
  showMessage(t("smsSent") + phone, () => {
    smsCode = "0000"; // príklad kódu
    navigateTo("smsVerificationScreen");
  });
}

function verifySMSCode() {
  const inputCode = document.getElementById("smsCodeInput").value.trim();
  if (inputCode === smsCode) {
    showMessage(t("phoneVerified"), () => {
      navigateTo("serviceSelectionScreen");
    });
  } else {
    showMessage(t("invalidCode"));
  }
}

function selectService(service) {
  showMessage(t("serviceSelected") + service, () => {
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
    showMessage(t("measuredWeight") + weight + " kg", () => {
      navigateTo("lockerInsertionScreen");
      simulateLockerInsertion();
    });
  }, 2100);
}

function generateOrderCode() {
  generatedOrderCode = Math.floor(100000 + Math.random() * 900000).toString();
  generatedQRCode = "QR" + generatedOrderCode;
  document.getElementById("orderCodeDisplay").innerText = generatedOrderCode;
  document.getElementById("qrCodeDisplay").innerText = generatedQRCode;
  navigateTo("orderCompletionScreen");
}

function scanQRCode() {
  showMessage(t("scanning"), () => {
    navigateTo("lockerInsertionScreen");
    simulateLockerInsertion();
  });
}

/* Aktualizovaná funkcia goToPaymentScreen:
   Ak je zadaný kód "admin1993", spustí sa admin režim.
*/
function goToPaymentScreen() {
  const pickupCode = document.getElementById("pickupCodeInput").value.trim();
  if (pickupCode === "admin1993") {
    navigateTo("adminLoginScreen");
    return;
  }
  navigateTo("paymentScreen");
}

/* Funkcie pre platbu:
   Po stlačení jednej z možností (kartou alebo bezkontaktné) sa simulovaná platba
   zobrazí a po krátkom oneskorení sa automaticky prejde na ďalší krok (Invoice Screen).
*/
function startCardPayment() {
  showMessage(t("cardPayment"), () => {
    setTimeout(() => {
      navigateTo("invoiceScreen");
    }, 2000);
  });
}

function startContactlessPayment() {
  showMessage(t("contactlessPayment"), () => {
    setTimeout(() => {
      navigateTo("invoiceScreen");
    }, 2000);
  });
}

function sendInvoice() {
  const email = document.getElementById("invoiceEmailInput").value.trim();
  if (!email) {
    showMessage(t("invalidEmail") || "Zadajte platný email!");
    return;
  }
  showMessage(t("invoiceSent") + email, () => {
    navigateTo("lockerOpenScreen");
  });
}

/***********************************************
 * SIMULÁCIA VLOŽENIA DO SKRINKY
 ***********************************************/
function simulateLockerInsertion() {
  // Simulácia vloženia prádla a následné vygenerovanie objednávkového kódu.
  setTimeout(() => {
    generateOrderCode();
  }, 3000);
}

/***********************************************
 * ADMIN FUNKCIE
 ***********************************************/
function adminLogin() {
  const code = document.getElementById("adminCodeInput").value.trim();
  const password = document.getElementById("adminPasswordInput").value.trim();
  if (code === "admin1993" && password === "adminpass") {
    showMessage(t("adminLoginSuccess"), () => {
      navigateTo("adminMenuScreen");
    });
  } else {
    showMessage(t("adminLoginFail"));
  }
}

function selectFirstLocker() {
  adminLockerCount = 5;
  adminCurrentLockerIndex = 1;
  adminSelectedLockers = [adminCurrentLockerIndex];
  document.getElementById("selectedLockerInfo").innerText =
    t("lockerSelected") + adminCurrentLockerIndex + t("lockerSelectedSuffix") +
    (generatedQRCode || "QR" + generatedOrderCode);
  document.getElementById("nextLockerButton").style.display = "inline-block";
  if (adminCurrentLockerIndex >= adminLockerCount) {
    document.getElementById("finishLockersButton").style.display = "inline-block";
    document.getElementById("nextLockerButton").style.display = "none";
  }
}

function selectNextLocker() {
  if (adminCurrentLockerIndex < adminLockerCount) {
    adminCurrentLockerIndex++;
    adminSelectedLockers.push(adminCurrentLockerIndex);
    let infoElem = document.getElementById("selectedLockerInfo");
    infoElem.innerText += "\n" + t("lockerSelected") + adminCurrentLockerIndex + t("lockerSelectedSuffix") +
      (generatedQRCode || "QR" + generatedOrderCode);
    if (adminCurrentLockerIndex >= adminLockerCount) {
      document.getElementById("finishLockersButton").style.display = "inline-block";
      document.getElementById("nextLockerButton").style.display = "none";
    }
  }
}

function finishLockerSelection() {
  showMessage(t("lockersCompleted"), () => {
    navigateHome();
  });
}

function openLockerForRestocking() {
  const qrCodeInput = document.getElementById("restockQRCodeInput").value.trim();
  if (!qrCodeInput) {
    showMessage(t("enterQRCode"));
    return;
  }
  document.getElementById("restockLockerInfo").innerText =
    "Skrinka otvorená pre objednávku s QR kódom: " + qrCodeInput;
  document.getElementById("insertNextOrderButton").style.display = "inline-block";
  document.getElementById("finishRestockingButton").style.display = "inline-block";
}

function insertNextOrder() {
  document.getElementById("restockQRCodeInput").value = "";
  document.getElementById("restockLockerInfo").innerText = "";
  document.getElementById("insertNextOrderButton").style.display = "none";
  document.getElementById("finishRestockingButton").style.display = "none";
  showMessage(t("readyForNextOrder"));
}

function finishRestocking() {
  showMessage(t("restockingCompleted"), () => {
    navigateHome();
  });
}
