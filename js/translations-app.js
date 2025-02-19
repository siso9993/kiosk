/*************************************************************
 * translations-app.js
 * 
 * Holds all translated strings for multiple languages (sk, en, ...).
 * Also has updateTranslations() which updates the DOM text
 * based on the current language.
 *************************************************************/

// The translations object. You can add more keys and languages as needed.
const translations = {
  sk: {
    // Home
    homeTitle: "Vitajte v EZ-WASH",
    homeDescription: "Chcete mať čisté a voňavé prádlo bez starostí? Naša služba EZ-WASH vám to zabezpečí rýchlo a spoľahlivo. Vložte prádlo do našich úložných boxov a o zvyšok sa postaráme my! O každom kroku budete informovaný SMSkou alebo notifikáciou v aplikácii.",
    
    // Registration
    registerButton: "Registrácia – získajte 50% zľavu",
    scanOrderButton: "Prihlásenie / Zadať objednávku",
    registerTitle: "Chcete ušetriť 50%? Zaregistrujte sa!",
    registerSubTitle1: "Apple QR",
    registerSubTitle2: "Android QR",
    registerSubTitle3: "Web QR",
    alreadyRegisteredButton: "Už som registrovaný / mám aplikáciu",
    phonePlaceholder: "0900 000 000",
    sendSMSButton: "Odoslať SMS kód a pokračovať",

    // SMS Verification
    smsVerificationTitle: "Overenie čísla",
    smsVerificationDescription: "Prosím zadajte 4-miestny kód, ktorý sme vám poslali SMS správou. Tým potvrdíme, že ste to naozaj vy.",
    verifySMSButton: "Overiť a pokračovať",

    // Other placeholders
    orderCodePlaceholder: "Zadajte kód",
    emailPlaceholder: "vasemail@example.com",

    // Example messages
    invalidPhone: "Zadajte telefónne číslo!",
    smsSent: "SMS kód bol odoslaný na ",
    phoneVerified: "Telefónne číslo bolo úspešne overené.",
    invalidCode: "Nesprávny kód. Skúste to znova.",
    serviceSelected: "Vybrali ste si službu: ",
    measuredWeight: "Zmeraná hmotnosť: ",
    scanning: "Naskenovanie prebieha...",
    cardPayment: "Platba kartou prebieha...",
    contactlessPayment: "Bezkontaktná platba prebieha...",
    invoiceSent: "Faktúra bola odoslaná na "
    // ... add more SK keys as needed
  },

  en: {
    // Home
    homeTitle: "Welcome to EZ-WASH",
    homeDescription: "Do you want clean and fresh laundry without the hassle? Our EZ-WASH service ensures fast and reliable care. Just drop your laundry in our storage boxes and we'll take care of the rest! You’ll be notified by SMS or app at each step.",

    // Registration
    registerButton: "Register – get 50% discount",
    scanOrderButton: "Login / Enter Order Code",
    registerTitle: "Want to save 50%? Register now!",
    registerSubTitle1: "Apple QR",
    registerSubTitle2: "Android QR",
    registerSubTitle3: "Web QR",
    alreadyRegisteredButton: "I'm already registered / have the app",
    phonePlaceholder: "Enter your phone number",
    sendSMSButton: "Send SMS code and continue",

    // SMS Verification
    smsVerificationTitle: "Phone Verification",
    smsVerificationDescription: "Please enter the 4-digit code we sent via SMS. This confirms that it's really you.",
    verifySMSButton: "Verify and continue",

    // Other placeholders
    orderCodePlaceholder: "Enter code",
    emailPlaceholder: "yourmail@example.com",

    // Example messages
    invalidPhone: "Please enter a phone number!",
    smsSent: "SMS code has been sent to ",
    phoneVerified: "Phone number verified successfully.",
    invalidCode: "Incorrect code. Please try again.",
    serviceSelected: "You have selected the service: ",
    measuredWeight: "Measured weight: ",
    scanning: "Scanning in progress...",
    cardPayment: "Processing card payment...",
    contactlessPayment: "Processing contactless payment...",
    invoiceSent: "Invoice has been sent to "
    // ... add more EN keys as needed
  }
};

/*************************************************************
 * updateTranslations():
 * 1. Read currentLanguage from window.currentLanguage
 * 2. For each element with [data-i18n], set textContent
 * 3. For each element with [data-i18n-placeholder], set placeholder
 *************************************************************/
function updateTranslations() {
  const lang = window.currentLanguage || 'sk';

  // 1) Update inner text
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // 2) Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
}
