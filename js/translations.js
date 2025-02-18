// js/translations.js
const translations = {
  sk: {
    homeTitle: "Vitajte v EZ-WASH",
    homeDescription: "Chcete mať čisté a voňavé prádlo bez starostí? Naša služba EZ-WASH vám to zabezpečí rýchlo a spoľahlivo. Vložte prádlo do našich úložných boxov a o zvyšok sa postaráme my! O každom kroku budete informovaný SMSkou alebo notifikáciou v aplikácii.",
    // Pole pre rotujúce popisy animácií
    homeAnimationLabels: [
      "Jednoducho zadáte objednávku priamo TU alebo cez WEB/APP",
      "Prádlo odvážite a vložíte do pridelenej skrinky",
      "Teraz už neostáva nič len počkať",
      "Prádlo vyzdvihneme a dodáme do našej práčovne",
      "V práčovni ho operieme, vysušíme, ožehlíme a zložíme",
      "O každom kroku budete informovaný SMS alebo APP notifikáciou",
      "Pred vyzdvihnutím jednoducho zaplatíte cez APP alebo priamo TU",
      "A už si len vyberiete svoje čisté prádlo z boxu"
    ],
    // Placeholder pre vstupy
    phonePlaceholder: "0900 000 000",
    orderCodePlaceholder: "Zadajte kód",
    emailPlaceholder: "vasemail@example.com",
    restockQRCodePlaceholder: "QR kód objednávky",
    
    newOrderButton: "Vytvoriť novú objednávku",
    scanOrderButton: "Zadať alebo naskenovať kód",
    registerButton: "Registrácia – získajte 50% zľavu",
    
    // Nová objednávka
    newOrderTitle: "Nová objednávka – začnime!",
    newOrderDescription: "Stačí zadať vaše telefónne číslo. Pošleme vám notifikácie o stave prania, aby ste mali vždy prehľad.",
    phoneLabel: "Vaše telefónne číslo:",
    sendSMSButton: "Odoslať SMS kód a pokračovať",
    
    // Overenie čísla
    smsVerificationTitle: "Overenie čísla",
    smsVerificationDescription: "Prosím zadajte 4-miestny kód, ktorý sme vám poslali SMS správou. Tým potvrdíme, že ste to naozaj vy.",
    smsCodeLabel: "Overovací kód z SMS:",
    verifySMSButton: "Overiť a pokračovať",
    
    // Výber služby
    serviceSelectionTitle: "Akú službu si želáte?",
    serviceSelectionDescription: "Vyberte si z ponuky služieb – všetky vykonávame s maximálnou starostlivosťou a kvalitnými pracími prostriedkami.",
    serviceOption1: "Pranie + Sušenie + Žehlenie + Zloženie",
    serviceOption1Price: "4,50 €/kg",
    serviceOption2: "Pranie + Sušenie + Zloženie",
    serviceOption2Price: "2,99 €/kg",
    
    // Váženie bielizne
    weightMeasurementTitle: "Zvážime vašu bielizeň",
    weightMeasurementStepsTitle: "Postup:",
    weightStep1: "Pripravte si Vaše prádlo ideálne do plastového sáčku.",
    weightStep2: "Pod Displejom uvidíte Zásobník/Kôš.",
    weightStep3: "Položte do neho všetko prádlo.",
    weightStep4: "Systém presne zmeria hmotnosť a odošle údaje do nášho systému.",
    weightMeasurementNote: "Meranie je informačné. Reálne váženie prebieha v práčovni po roztriedení prádla.",
    startWeightButton: "Spustiť váženie",
    
    // Vkladanie do boxu
    lockerInsertionTitle: "Vložte prádlo do boxu",
    lockerInsertionDescription: "Dvierka sa otvorili. Vložte prosím vašu bielizeň dovnútra. DOKLADNE UZATVORTE SKRINKU A NEZABUDNITE SI PREVZIAŤ LÍSTOK. Po zatvorení boxu sa objednávka dokončí a my sa ihneď pustíme do práce!",
    
    // Dokončenie objednávky
    orderCompletionTitle: "Objednávka dokončená!",
    orderCompletionNote: "Nezabudnite si tieto informácie uložiť a zobrať si vytlačený lístok.",
    orderCodeLabel: "Váš objednávkový kód:",
    qrCodeLabel: "QR kód:",
    orderCompletionDescription: "Všetko vybavené! Použite tento kód alebo QR pri vyzdvihnutí. Ďakujeme, že ste si vybrali EZ-WASH!",
    returnHomeButton: "Späť na hlavnú obrazovku",
    
    // Registrácia
    registerTitle: "Chcete ušetriť 50 %? Zaregistrujte sa!",
    registerSubTitle1: "Apple QR",
    registerSubTitle2: "Android QR",
    registerSubTitle3: "Web QR",
    alreadyRegisteredButton: "Už som registrovaný / mám aplikáciu",
    
    // Zadať kód objednávky
    scanOrderTitle: "Máte kód z webu alebo aplikácie?",
    scanOrderDescription: "Zadajte ho sem, alebo rovno naskenujte QR kód. Ešte rýchlejšie sa tak dostanete k vašej objednávke.",
    orderCodeLabel: "Objednávkový kód:",
    scanQRCodeButton: "Naskenovať QR kód",
    
    // Vyzdvihnutie objednávky
    orderPickupTitle: "Chcete si vyzdvihnúť prádlo?",
    orderPickupDescription: "Zadajte alebo naskenujte kód, ktorý ste obdržali.",
    pickupOrderCodeLabel: "Objednávkový kód:",
    pickupContinueButton: "Pokračovať",
    
    // Platba
    paymentTitle: "Platba za objednávku",
    paymentDescription: "Ešte ste nezaúčtovali vašu objednávku. Prosím vyberte si formu úhrady.",
    paymentAmountLabel: "Suma na úhradu:",
    choosePaymentMethod: "Zvoľte, ako chcete zaplatiť:",
    payCardButton: "Zaplatiť platobnou kartou",
    payContactlessButton: "Zaplatiť bezkontaktne (mobil, hodinky)",
    
    // Faktúra
    invoiceTitle: "Odoslanie faktúry",
    invoiceDescription: "Zadajte váš e-mail a my vám ju okamžite pošleme.",
    emailLabel: "Email:",
    sendInvoiceButton: "Odoslať faktúru",
    
    // Skrinka otvorená
    lockerOpenTitle: "Skrinka otvorená",
    lockerOpenNote: "Po prevzatí prádla skrinku dôkladne zatvorte, aby bola pripravená pre ďalšieho zákazníka.",
    lockerOpenReturnButton: "Návrat na úvodnú obrazovku",
    
    // Admin prihlasovanie
    adminLoginTitle: "Administrátorské prihlásenie",
    adminLoginDescription: "Zadajte svoj admin kód a heslo pre prístup do správy systému.",
    adminCodeLabel: "Admin kód:",
    adminPasswordLabel: "Heslo:",
    adminLoginButton: "Prihlásiť sa",
    adminLoginReturnButton: "Späť na hlavnú obrazovku",
    
    // Admin menu
    adminMenuTitle: "Admin menu",
    adminMenuOption1: "Výber voľných skriniek",
    adminMenuOption2: "Doplnenie objednávok do skriniek",
    adminMenuReturnButton: "Späť na hlavnú obrazovku",
    
    // Výber skriniek
    lockerSelectionTitle: "Výber skriniek",
    availableLockersLabel: "Počet voľných skriniek na výber:",
    selectFirstLockerButton: "Vybrať prvú skrinku",
    selectNextLockerButton: "Vybrať ďalšiu skrinku",
    finishLockersButton: "Dokončiť výber skriniek",
    
    // Doplnenie skriniek
    lockerRestockingTitle: "Doplnenie skriniek",
    lockerRestockingDescription: "Naskenujte alebo zadajte QR kód objednávky, ktorá sa má vložiť do skrinky.",
    restockQRCodePlaceholder: "QR kód objednávky",
    openLockerButton: "Otvoriť skrinku",
    insertNextOrderButton: "Vložiť ďalšiu objednávku",
    finishRestockingButton: "Ukončiť dopĺňanie skriniek",
    
    // Pravý panel - Vyzdvihnutie
    pickupHomeTitle: "Okamžité vyzdvihnutie",
    pickupHomeDescription: "Ak už máte kód a chcete si prádlo vyzdvihnúť ihneď, kliknite na tlačidlo nižšie.",
    pickupOrderButton: "Vyzdvihnúť objednávku",
    
    // Pravý panel - Navigácia
    navigationTitle: "Navigácia",
    navigationDescription: "Pre návrat na hlavnú obrazovku stlačte tlačidlo.",
    homeButton: "Domov",
    
    // Ostatné správy (používané v kiosk.js)
    switchingLanguage: "Prepínam jazyk na: ",
    invalidPhone: "Zadajte telefónne číslo!",
    smsSent: "SMS kód bol odoslaný na číslo ",
    phoneVerified: "Telefónne číslo bolo úspešne overené.",
    invalidCode: "Nesprávny kód. Skúste to znova.",
    serviceSelected: "Vybrali ste službu: ",
    measuredWeight: "Zmeraná hmotnosť: ",
    scanning: "Naskenovanie prebieha...",
    cardPayment: "Platba kartou prebieha...",
    contactlessPayment: "Bezkontaktná platba prebieha...",
    invoiceSent: "Faktúra bola odoslaná na ",
    adminLoginSuccess: "Admin prihlásenie úspešné.",
    adminLoginFail: "Nesprávne admin údaje. Skúste to znova.",
    lockerSelected: "Skrinka č. ",
    lockerSelectedSuffix: " vybratá a otvorená. Vytlačený QR kód: ",
    lockersCompleted: "Všetky skrinky boli vybraté. SMS a notifikácia boli odoslané zákazníkovi.",
    enterQRCode: "Zadajte kód alebo naskenujte QR objednávky!",
    readyForNextOrder: "Pripravený pre ďalšiu objednávku.",
    restockingCompleted: "Vkladanie objednávok bolo ukončené. SMS a notifikácia boli odoslané zákazníkovi."
  },
  en: {
    homeTitle: "Welcome to EZ-WASH",
    homeDescription: "Do you want clean and fresh laundry without the hassle? Our EZ-WASH service ensures fast and reliable care. Simply drop your laundry in our storage boxes and we'll take care of the rest! You'll receive SMS or app notifications every step of the way.",
    homeAnimationLabels: [
      "Simply place your order right here or via the WEB/APP",
      "Drop off your laundry and place it in the designated locker",
      "Now all you have to do is wait",
      "We pick up your laundry and deliver it to our laundromat",
      "Your laundry is washed, dried, ironed, and folded at the laundromat",
      "You'll be notified at every step via SMS or APP notifications",
      "Simply pay via the APP or right here before pickup",
      "Then just collect your clean laundry from the locker"
    ],
    phonePlaceholder: "Enter your phone number",
    newOrderButton: "Create new order",
    scanOrderButton: "Enter or scan code",
    registerButton: "Register – get 50% discount",
    
    // New Order Screen
    newOrderTitle: "New Order – Let's Start!",
    newOrderDescription: "Just enter your phone number. We'll send you notifications about your laundry status so you're always informed.",
    phoneLabel: "Your phone number:",
    sendSMSButton: "Send SMS code and continue",
    
    // SMS Verification Screen
    smsVerificationTitle: "Phone Verification",
    smsVerificationDescription: "Please enter the 4-digit code we sent you via SMS to verify your identity.",
    smsCodeLabel: "SMS verification code:",
    verifySMSButton: "Verify and continue",
    
    // Service Selection Screen
    serviceSelectionTitle: "Which service would you like?",
    serviceSelectionDescription: "Choose from our service options – all are executed with utmost care and high-quality cleaning agents.",
    serviceOption1: "Washing + Drying + Ironing + Folding",
    serviceOption1Price: "4.50 €/kg",
    serviceOption2: "Washing + Drying + Folding",
    serviceOption2Price: "2.99 €/kg",
    
    // Weight Measurement Screen
    weightMeasurementTitle: "Let's Weigh Your Laundry",
    weightMeasurementStepsTitle: "Steps:",
    weightStep1: "Prepare your laundry, preferably in a plastic bag.",
    weightStep2: "You will see a container/bin under the display.",
    weightStep3: "Place all your laundry into it.",
    weightStep4: "The system will precisely measure the weight and send the data to our system.",
    weightMeasurementNote: "The measurement is informational. Actual weighing occurs in the laundromat after sorting.",
    startWeightButton: "Start weighing",
    
    // Locker Insertion Screen
    lockerInsertionTitle: "Insert your laundry into the box",
    lockerInsertionDescription: "The door has opened. Please insert your laundry. MAKE SURE TO CLOSE THE CABINET THOROUGHLY AND TAKE THE TICKET. Once closed, the order is completed and we start working immediately!",
    
    // Order Completion Screen
    orderCompletionTitle: "Order Completed!",
    orderCompletionNote: "Don't forget to save this information and take the printed ticket.",
    orderCodeLabel: "Your order code:",
    qrCodeLabel: "QR code:",
    orderCompletionDescription: "Everything is set! Use this code or QR when picking up your laundry. Thank you for choosing EZ-WASH!",
    returnHomeButton: "Back to home screen",
    orderCodePlaceholder: "Enter code",
    
    // Register Screen
    registerTitle: "Want to save 50%? Register now!",
    registerSubTitle1: "Apple QR",
    registerSubTitle2: "Android QR",
    registerSubTitle3: "Web QR",
    alreadyRegisteredButton: "I'm already registered / have the app",
    
    // Scan Order Screen
    scanOrderTitle: "Do you have a code from the web or app?",
    scanOrderDescription: "Enter it here, or scan the QR code directly for quicker access to your order.",
    orderCodeLabel: "Order code:",
    scanQRCodeButton: "Scan QR code",
    
    // Order Pickup Payment Screen
    orderPickupTitle: "Do you want to pick up your laundry?",
    orderPickupDescription: "Enter or scan the code you received.",
    pickupOrderCodeLabel: "Order code:",
    pickupContinueButton: "Continue",
    
    // Payment Screen
    paymentTitle: "Payment for the Order",
    paymentDescription: "Your order has not been charged yet. Please choose a payment method.",
    paymentAmountLabel: "Amount to be paid:",
    choosePaymentMethod: "Choose your payment method:",
    payCardButton: "Pay with credit card",
    payContactlessButton: "Pay contactlessly (mobile, watch)",
    
    // Invoice Screen
    invoiceTitle: "Send Invoice",
    invoiceDescription: "Enter your email and we'll send the invoice immediately.",
    emailLabel: "Email:",
    sendInvoiceButton: "Send invoice",
    emailPlaceholder: "yourmail@example.com",
    
    // Locker Open Screen
    lockerOpenTitle: "Cabinet Opened",
    lockerOpenNote: "After picking up your laundry, please close the cabinet thoroughly so it's ready for the next customer.",
    lockerOpenReturnButton: "Return to home screen",
    
    // Admin Login Screen
    adminLoginTitle: "Admin Login",
    adminLoginDescription: "Enter your admin code and password to access the system management.",
    adminCodeLabel: "Admin code:",
    adminPasswordLabel: "Password:",
    adminLoginButton: "Log in",
    adminLoginReturnButton: "Back to home screen",
    
    // Admin Menu Screen
    adminMenuTitle: "Admin Menu",
    adminMenuOption1: "Select available lockers",
    adminMenuOption2: "Restock orders into lockers",
    adminMenuReturnButton: "Back to home screen",
    
    // Locker Selection Screen
    lockerSelectionTitle: "Locker Selection",
    availableLockersLabel: "Number of available lockers:",
    selectFirstLockerButton: "Select first locker",
    selectNextLockerButton: "Select next locker",
    finishLockersButton: "Finish locker selection",
    
    // Locker Restocking Screen
    lockerRestockingTitle: "Locker Restocking",
    lockerRestockingDescription: "Scan or enter the QR code of the order to be inserted into the locker.",
    restockQRCodePlaceholder: "Order QR code",
    openLockerButton: "Open locker",
    insertNextOrderButton: "Insert next order",
    finishRestockingButton: "Finish restocking",
    
    // Right Panel - Pickup Home Screen
    pickupHomeTitle: "Immediate Pickup",
    pickupHomeDescription: "If you already have a code and want to pick up your laundry immediately, click the button below.",
    pickupOrderButton: "Pick up order",
    
    // Right Panel - Navigation Home Screen
    navigationTitle: "Navigation",
    navigationDescription: "Press the button to return to the home screen.",
    homeButton: "Home",
    
    // Miscellaneous messages
    switchingLanguage: "Switching language to: ",
    invalidPhone: "Please enter a phone number!",
    smsSent: "SMS code has been sent to ",
    phoneVerified: "Phone number verified successfully.",
    invalidCode: "Incorrect code. Please try again.",
    serviceSelected: "You have selected the service: ",
    measuredWeight: "Measured weight: ",
    scanning: "Scanning in progress...",
    cardPayment: "Processing card payment...",
    contactlessPayment: "Processing contactless payment...",
    invoiceSent: "Invoice has been sent to ",
    adminLoginSuccess: "Admin login successful.",
    adminLoginFail: "Incorrect admin credentials. Please try again.",
    lockerSelected: "Locker no. ",
    lockerSelectedSuffix: " selected and opened. Printed QR code: ",
    lockersCompleted: "All lockers have been selected. SMS and notification have been sent to the customer.",
    enterQRCode: "Please enter or scan the order QR code!",
    readyForNextOrder: "Ready for the next order.",
    restockingCompleted: "Restocking completed. SMS and notification have been sent to the customer."
  }
};
