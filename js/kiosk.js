// kiosk.js

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
  showMessage("Prepínam jazyk na: " + (lang === "sk" ? "Slovenčina" : "English"));
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
    showMessage("Zadajte telefónne číslo!");
    return;
  }
  showMessage("SMS kód bol odoslaný na číslo " + phone, () => {
    smsCode = "0000"; // príklad kódu
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
  showMessage("Naskenovanie prebieha...", () => {
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
  showMessage("Platba kartou prebieha...", () => {
    setTimeout(() => {
      navigateTo("invoiceScreen");
    }, 2000);
  });
}

function startContactlessPayment() {
  showMessage("Bezkontaktná platba prebieha...", () => {
    setTimeout(() => {
      navigateTo("invoiceScreen");
    }, 2000);
  });
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

/* Admin prihlasovanie:
   Overuje či zadaný admin kód a heslo sú správne.
   Pre príklad používame: kód "admin1993" a heslo "adminpass".
*/
function adminLogin() {
  const code = document.getElementById("adminCodeInput").value.trim();
  const password = document.getElementById("adminPasswordInput").value.trim();
  if (code === "admin1993" && password === "adminpass") {
    showMessage("Admin prihlásenie úspešné.", () => {
      navigateTo("adminMenuScreen");
    });
  } else {
    showMessage("Nesprávne admin údaje. Skúste to znova.");
  }
}

/* Režim výberu skriniek:
   1. Po stlačení "Vybrať prvú skrinku" sa otvorí prvá skrinka a vytlačí sa QR kód.
   2. Po stlačení "Vybrať ďalšiu skrinku" sa vyberie ďalšia skrinka.
   3. Po vybratí všetkých skriniek sa zobrazí možnosť "Hotovo, všetky skrinky vybraté".
*/
function selectFirstLocker() {
  adminLockerCount = 5; // alebo načítanie aktuálneho počtu skriniek
  adminCurrentLockerIndex = 1;
  adminSelectedLockers = [adminCurrentLockerIndex];
  document.getElementById("selectedLockerInfo").innerText =
    "Skrinka č. " +
    adminCurrentLockerIndex +
    " vybratá a otvorená. Vytlačený QR kód: " +
    (generatedQRCode || "QR" + generatedOrderCode);
  document.getElementById("nextLockerButton").style.display = "inline-block";
  // Ak už bol vybraný počet skriniek, zobrazíme tlačidlo Hotovo
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
    infoElem.innerText += "\nSkrinka č. " +
      adminCurrentLockerIndex +
      " vybratá a otvorená. Vytlačený QR kód: " +
      (generatedQRCode || "QR" + generatedOrderCode);
    if (adminCurrentLockerIndex >= adminLockerCount) {
      document.getElementById("finishLockersButton").style.display = "inline-block";
      document.getElementById("nextLockerButton").style.display = "none";
    }
  }
}

function finishLockerSelection() {
  showMessage("Všetky skrinky boli vybraté. SMS a notifikácia boli odoslané zákazníkovi.", () => {
    navigateHome();
  });
}

/* Režim doplnenia skriniek:
   1. Zamestnanec naskenuje alebo zadá QR kód prvej objednávky.
   2. Skrinka sa otvorí a zobrazí sa informácia o otvorení.
   3. Zamestnanec môže vložiť ďalšiu objednávku alebo ukončiť vkladanie.
*/
function openLockerForRestocking() {
  const qrCodeInput = document.getElementById("restockQRCodeInput").value.trim();
  if (!qrCodeInput) {
    showMessage("Zadajte QR kód objednávky!");
    return;
  }
  document.getElementById("restockLockerInfo").innerText =
    "Skrinka otvorená pre objednávku s QR kódom: " + qrCodeInput;
  document.getElementById("insertNextOrderButton").style.display = "inline-block";
  document.getElementById("finishRestockingButton").style.display = "inline-block";
}

function insertNextOrder() {
  // Reset pre vloženie ďalšej objednávky
  document.getElementById("restockQRCodeInput").value = "";
  document.getElementById("restockLockerInfo").innerText = "";
  document.getElementById("insertNextOrderButton").style.display = "none";
  document.getElementById("finishRestockingButton").style.display = "none";
  showMessage("Pripravený pre ďalšiu objednávku.");
}

function finishRestocking() {
  showMessage("Vkladanie objednávok bolo ukončené. SMS a notifikácia boli odoslané zákazníkovi.", () => {
    navigateHome();
  });
}
