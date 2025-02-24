<?php
// ---------------------------------------
// Mock login logic (for demo):
// (This server–side check is only used by PHP to set an initial state.
// The actual login/registration is simulated client-side.)
session_start();
$isLoggedIn = false;
if (isset($_GET['logged']) && $_GET['logged'] === '1') {
  $isLoggedIn = true;
  $_SESSION['user'] = 'demo-user';
}
if (isset($_GET['logout']) && $_GET['logout'] === '1') {
  $isLoggedIn = false;
  unset($_SESSION['user']);
}
?>
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EZ-WASH Mobilná Aplikácia (Kiosk Prototype)</title>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

  <!-- Lottie (for .json animations) -->
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

  <!-- Main CSS -->
  <link rel="stylesheet" href="css/kiosk-app.css" />

  <script>
    // Set global variable for login status so external JS files can access it.
    window.isLoggedIn = <?php echo $isLoggedIn ? 'true' : 'false'; ?>;
    
    // Simulate login function (uses URL parameters for demo)
    function loginUser() {
      // In a real environment, you'd validate login data.
      // For demo, simply redirect to set ?logged=1.
      const usernameInput = document.getElementById('loginUsername');
      const passwordInput = document.getElementById('loginPassword');
      if (!usernameInput || !passwordInput) return;
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      if (username === "test" && password === "test") {
        window.location.href = "?logged=1";
      } else {
        showMessage("Neplatné prihlasovacie údaje. Zadajte prosím 'test' / 'test'.");
      }
    }
    
    function logoutUser() {
      window.location.href = "?logout=1";
    }
  </script>
  
  <!-- You can remove the inline CSS below if your external CSS (kiosk-app.css) covers everything -->
  <style>
    /* Basic layout & screens using only specified animations */
    body {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
      background: #f8f9fa;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .app-wrapper {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    .screen {
      display: none;
      padding: 20px;
    }
    .screen.active {
      display: block;
    }
    .lottie-container {
      margin: 20px auto;
      width: 240px;
      height: 240px;
    }
    button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
    button i {
      font-size: 1rem;
    }
    .bottom-nav {
      width: 100%;
      height: 60px;
      background: #fff;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1000;
    }
    .bottom-nav .nav-item {
      flex: 1;
      text-align: center;
      padding: 5px;
      color: #666;
      font-size: 0.75rem;
    }
    .bottom-nav .nav-item i {
      display: block;
      font-size: 1.3rem;
      margin: 0 auto 3px;
    }
    .bottom-nav .nav-item.active {
      color: #007bff;
    }
    .hidden {
      display: none !important;
    }
    .language-switcher {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    .lang-option {
      cursor: pointer;
      margin-left: 5px;
    }
    footer {
      text-align: center;
      background: #f1f1f1;
      padding: 10px;
    }
    .modal {
      display: none;
      position: fixed;
      z-index: 9999;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.5);
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 6px;
      text-align: center;
    }
    .user-phone-display {
      position: absolute;
      top: 8px;
      left: 8px;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      display: none;
    }
  </style>
  
</head>
<body>

  <!-- Display user's phone number in top-left (visible after login) -->
  <div id="userPhoneDisplay" class="user-phone-display" style="<?php echo $isLoggedIn ? 'display:block;' : ''; ?>">
    <?php echo $isLoggedIn ? $_SESSION['user'] : ''; ?>
  </div>

  <!-- Language Switcher (top-right) -->
  <div class="language-switcher">
    <span class="lang-option" onclick="setLanguage('sk')">🇸🇰</span>
    <span class="lang-option" onclick="setLanguage('en')">🇬🇧</span>
  </div>

  <!-- Main application wrapper -->
  <div class="app-wrapper" id="appWrapper">
    
    <!-- HOME SCREEN -->
    <div id="homeScreen" class="screen active">
      <h1 data-i18n="homeTitle">Vitajte v EZ-WASH</h1>
      <div class="lottie-container">
        <lottie-player id="homeLottie" src="assets/lottie/zadanie-objednavky.json" background="transparent" speed="0.6" loop autoplay></lottie-player>
      </div>
      <p data-i18n="homeDescription">
        Chcete mať čisté a voňavé prádlo bez starostí? ...
      </p>
      <!-- Always show registration and login buttons on the home screen -->
      <button onclick="navigateTo('registrationScreen')">
        <i class="fa-solid fa-user-plus"></i>
        <span data-i18n="registerButton">Registrácia – získajte 50% zľavu</span>
      </button>
      <button onclick="navigateTo('loginScreen')">
        <i class="fa-solid fa-sign-in"></i>
        <span data-i18n="scanOrderButton">Prihlásenie / Zadať objednávku</span>
      </button>
    </div>
    
    <!-- LOGIN SCREEN -->
    <div id="loginScreen" class="screen">
      <h1>Prihlásenie / Zadať objednávku</h1>
      <div class="lottie-container">
        <lottie-player src="assets/lottie/zadavanie-kodu.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <p>Zadajte prihlasovacie údaje (test/test) alebo kód objednávky:</p>
      <input type="text" placeholder="Používateľské meno" id="loginUsername" onclick="openKeyboardForInput('loginUsername')" />
      <input type="password" placeholder="Heslo" id="loginPassword" onclick="openKeyboardForInput('loginPassword')" />
      <button onclick="loginUser()">
        <i class="fa-solid fa-sign-in"></i>
        Prihlásiť sa
      </button>
    </div>
    
    <!-- REGISTRATION SCREEN -->
    <div id="registrationScreen" class="screen">
      <h1 data-i18n="registerTitle">Chcete ušetriť 50%? Zaregistrujte sa!</h1>
      <div class="lottie-container">
        <lottie-player src="assets/lottie/registracia.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <p>Zadajte telefónne číslo pre odoslanie SMS kódu:</p>
      <input type="tel" id="registerPhoneInput" placeholder="0900 000 000" onclick="openKeyboardForInput('registerPhoneInput')" />
      <button onclick="sendSMSCodeForRegistration()">
        <i class="fa-solid fa-sms"></i>
        Odoslať SMS kód
      </button>
    </div>
    
    <!-- SMS VERIFICATION SCREEN -->
    <div id="smsVerificationScreen" class="screen">
      <h1 data-i18n="smsVerificationTitle">Overenie čísla</h1>
      <div class="lottie-container">
        <lottie-player src="assets/lottie/overenie-telefonu.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <p data-i18n="smsVerificationDescription">Zadajte 4-miestny kód z SMS:</p>
      <input type="text" id="smsCodeInput" placeholder="0000" onclick="openKeyboardForInput('smsCodeInput')" />
      <button onclick="verifySMSCode()">
        <i class="fa-solid fa-check-circle"></i>
        Overiť
      </button>
    </div>
    
    <!-- MAIN MENU SCREEN (accessible only after login/registration) -->
    <div id="mainMenuScreen" class="screen">
      <h1>Hlavné menu</h1>
      <button onclick="navigateTo('newOrderScreen')">
        <i class="fa-solid fa-plus-circle"></i> Nová objednávka
      </button>
      <button onclick="navigateTo('mapScreen')">
        <i class="fa-solid fa-map"></i> Mapa
      </button>
      <button onclick="navigateTo('profileScreen')">
        <i class="fa-solid fa-user"></i> Profil
      </button>
      <button onclick="logoutUser()">
        <i class="fa-solid fa-sign-out"></i> Odhlásiť
      </button>
    </div>
    
    <!-- NEW ORDER SCREEN -->
    <div id="newOrderScreen" class="screen">
      <h1 data-i18n="newOrderTitle">Nová objednávka – začnime!</h1>
      <div class="lottie-container">
        <lottie-player src="assets/lottie/zadanie-objednavky.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <p>Vyberte typ služby:</p>
      <button onclick="selectService('Pranie + Sušenie + Zloženie')">
        <i class="fa-solid fa-shirt"></i> Pranie + Sušenie + Zloženie
      </button>
      <button onclick="selectService('Pranie + Sušenie + Žehlenie + Zloženie')">
        <i class="fa-solid fa-shirt"></i> Pranie + Sušenie + Žehlenie + Zloženie
      </button>
    </div>
    
    <!-- LOCKER LOCATION SCREEN -->
    <div id="lockerLocationScreen" class="screen">
      <h1>Vyhľadanie najbližšieho boxu</h1>
      <div class="lottie-container">
        <lottie-player src="assets/lottie/map-animation.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <p>Zadajte PSČ, aby sme vám našli najbližšie lockerboxy:</p>
      <input type="text" id="zipCodeInput" placeholder="PSČ (napr. 01001)" onclick="openKeyboardForInput('zipCodeInput')" />
      <button onclick="findNearestLockers()">
        <i class="fa-solid fa-search"></i> Vyhľadať
      </button>
      <div id="lockerResult" style="margin-top:20px; color:#444;"></div>
      <button id="lockerNextBtn" style="display:none;" onclick="goToOrderConfirmation()">
        <i class="fa-solid fa-chevron-right"></i> Pokračovať
      </button>
    </div>
    
    <!-- ORDER CONFIRMATION SCREEN -->
    <div id="orderConfirmationScreen" class="screen">
      <h1>Objednávka prijatá!</h1>
      <div class="lottie-container">
        <lottie-player src="assets/lottie/objednavka-kompletna.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <p>Váš objednávkový kód: <strong id="orderCodeDisplay"></strong></p>
      <p>QR kód: <strong id="qrCodeDisplay"></strong></p>
      <p>
        Teraz prosím prejdite k najbližšiemu boxu a stlačte 
        <em>“Zadať alebo naskenovať kód”</em>.
      </p>
      <img src="assets/zadana-obj.png" alt="Zadana Objednavka" style="max-width: 100%; margin: 10px 0;" />
      <p>Ďakujeme, že využívate EZ-WASH!</p>
      <button onclick="navigateTo('homeScreen')">Späť na úvod</button>
    </div>
    
    <!-- MAP SCREEN -->
    <div id="mapScreen" class="screen">
      <h1>Mapa</h1>
      <div class="lottie-container">
        <lottie-player src="assets/lottie/map-animation.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <p>Najbližšie boxy...</p>
    </div>
    
    <!-- PROFILE SCREEN -->
    <div id="profileScreen" class="screen">
      <h1>Váš profil</h1>
      <div class="lottie-container">
        <lottie-player src="assets/lottie/pracovna.json" background="transparent" speed="1" loop autoplay></lottie-player>
      </div>
      <p>Tu môžu byť detaily používateľa...</p>
    </div>
    
    <!-- TERMS SCREEN -->
    <div id="termsScreen" class="screen">
      <h1>Obchodné podmienky</h1>
      <p>Sem vložte obsah...</p>
      <button onclick="navigateHome()">Naspäť</button>
    </div>
    
    <!-- GDPR SCREEN -->
    <div id="gdprScreen" class="screen">
      <h1>GDPR</h1>
      <p>Sem vložte obsah...</p>
      <button onclick="navigateHome()">Naspäť</button>
    </div>
    
    <!-- PRICING SCREEN -->
    <div id="pricingScreen" class="screen">
      <h1>Cenník</h1>
      <p>Sem vložte obsah...</p>
      <button onclick="navigateHome()">Naspäť</button>
    </div>
    
  </div><!-- end .app-wrapper -->

  <!-- BOTTOM NAVIGATION -->
  <div class="bottom-nav">
    <!-- Always visible: Home icon -->
    <div class="nav-item" id="navHome" onclick="navigateTo('homeScreen')">
      <i class="fa-solid fa-house"></i>
      <span>Domov</span>
    </div>
    <!-- These nav items are visible only when logged in -->
    <div class="nav-item <?php echo !$isLoggedIn ? 'hidden' : ''; ?>" id="navOrder" onclick="navigateTo('newOrderScreen')">
      <i class="fa-solid fa-plus-circle"></i>
      <span>Objednávka</span>
    </div>
    <div class="nav-item" id="navMap" onclick="navigateTo('mapScreen')">
      <i class="fa-solid fa-map"></i>
      <span>Mapa</span>
    </div>
    <div class="nav-item <?php echo !$isLoggedIn ? 'hidden' : ''; ?>" id="navProfile" onclick="navigateTo('profileScreen')">
      <i class="fa-solid fa-user"></i>
      <span>Profil</span>
    </div>
  </div>

  <!-- FOOTER -->
  <footer>
    <a href="#" onclick="navigateTo('termsScreen')">Obchodné podmienky</a> |
    <a href="#" onclick="navigateTo('gdprScreen')">GDPR</a> |
    <a href="#" onclick="navigateTo('pricingScreen')">Cenník</a>
  </footer>

  <!-- MODAL for messages -->
  <div id="messageModal" class="modal">
    <div class="modal-content">
      <p id="modalMessage"></p>
      <button onclick="closeModalMessage()">OK</button>
    </div>
  </div>

  <!-- ON-SCREEN KEYBOARD -->
  <div id="keyboardContainer" style="display:none;">
    <div id="keyboard"></div>
  </div>

  <!-- JS: Translations, Keyboard, Main kiosk logic -->
  <script src="js/translations-app.js"></script>
  <script src="js/kiosk-keyboard.js"></script>
  <script src="js/kiosk-app.js"></script>
</body>
</html>
