<?php
  // ------------------------------------------------
  // (OPTIONAL) Minimal "session" mockup.
  // If there's a real login, you'd do session_start() and store session data.
  // For demonstration, we just use a simple GET param to mock "logged in".
  // ------------------------------------------------

  session_start();
  $isLoggedIn = false;
  if (isset($_GET['logged']) && $_GET['logged'] === '1') {
    $isLoggedIn = true;
    $_SESSION['user_id'] = 999; // Example user ID
  }

  if (isset($_GET['logout']) && $_GET['logout'] === '1') {
    $isLoggedIn = false;
    unset($_SESSION['user_id']);
  }

  // If we had real sessions:
  // $isLoggedIn = isset($_SESSION['user_id']);

?>
<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>EZ-WASH Aplikácia (Prototype)</title>

  <!-- Google Fonts -->
  <link
    href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
    rel="stylesheet"
  />

  <!-- Font Awesome -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
  />

  <!-- Lottie (for .json animations) -->
  <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

  <!-- Main CSS -->
  <link rel="stylesheet" href="css/kiosk.css"/>

  <style>
    /* Example style overrides for a mobile/tablet layout */

    body {
      font-family: 'Roboto', sans-serif;
      margin: 0;
      padding: 0;
      background: #f8f9fa;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    /* Container for the main "screens" */
    .app-wrapper {
      flex: 1; 
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    /* Each "screen" is hidden by default. We'll show/hide via JS. */
    .screen {
      display: none;
      padding: 20px;
    }
    .screen.active {
      display: block;
    }

    /* Title styling */
    h1 {
      font-size: 1.4rem;
      margin: 0 0 10px;
      font-weight: 700;
    }

    /* Sub text or paragraphs */
    p {
      margin: 10px 0;
    }

    /* Buttons common style */
    button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      margin-top: 10px;
      background: #007bff;
      color: #fff;
    }
    button i {
      font-size: 1rem;
    }

    /* Bottom navigation bar (shown after login) */
    .bottom-nav {
      width: 100%;
      height: 60px;
      background: #fff;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: space-around;
      align-items: center;
      /* fixed at bottom */
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1000;
    }
    .bottom-nav .nav-item {
      text-align: center;
      font-size: 0.75rem;
      color: #444;
      flex: 1;
    }
    .bottom-nav .nav-item i {
      display: block;
      font-size: 1.3rem;
      margin-bottom: 3px;
    }
    .bottom-nav .nav-item.active {
      color: #007bff;
    }

    /* Simple language switch, top-right corner */
    .language-switcher {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .lang-option {
      cursor: pointer;
      margin-left: 5px;
    }

    /* Lottie container example */
    .lottie-container {
      margin: 20px auto;
      width: 200px;
      height: 200px;
    }

    /* Input fields style */
    input[type="text"],
    input[type="tel"],
    input[type="password"],
    input[type="email"] {
      width: 100%;
      padding: 10px;
      margin: 6px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.95rem;
    }

    /* Example link style */
    a {
      color: #007bff;
      text-decoration: none;
    }

    /* Simple modal style (if you use it) */
    .modal {
      display: none; /* hidden by default */
      position: fixed;
      z-index: 9999;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.5);
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background: #fff;
      padding: 20px;
      border-radius: 6px;
      text-align: center;
    }

  </style>
</head>
<body>

  <!-- Language Switcher -->
  <div class="language-switcher">
    <span class="lang-option" onclick="setLanguage('sk')">🇸🇰</span>
    <span class="lang-option" onclick="setLanguage('en')">🇬🇧</span>
  </div>

  <!-- MAIN WRAPPER FOR SCREENS -->
  <div class="app-wrapper" id="appWrapper">

    <!-- HOME SCREEN (Shown if not logged in or as a welcome) -->
    <div id="homeScreen" class="screen active">
      <h1 data-i18n="homeTitle">Vitajte v EZ-WASH</h1>
      <p data-i18n="homeDescription">
        Chcete mať čisté a voňavé prádlo bez starostí? ...
      </p>
      <div class="lottie-container">
        <lottie-player
          id="homeLottie"
          src="assets/lottie/home-animation.json"
          background="transparent"
          speed="0.6"
          style="width: 100%; height: 100%;"
          autoplay
        ></lottie-player>
      </div>

      <!-- If user is not logged in, show big CTAs -->
      <?php if (!$isLoggedIn): ?>
        <button onclick="navigateTo('registrationScreen')">
          <i class="fa-solid fa-user-plus"></i>
          <span data-i18n="registerButton">Registrácia – získajte 50% zľavu</span>
        </button>
        <button onclick="navigateTo('loginScreen')">
          <i class="fa-solid fa-sign-in"></i>
          <span data-i18n="scanOrderButton">Prihlásenie / Zadať objednávku</span>
        </button>
      <?php else: ?>
        <!-- If user IS logged in, show a quick link to main menu or orders -->
        <button onclick="navigateTo('mainMenuScreen')">
          <i class="fa-solid fa-bars"></i>
          <span>Prejsť do menu</span>
        </button>
      <?php endif; ?>
    </div>
    
    <!-- REGISTRATION SCREEN -->
    <div id="registrationScreen" class="screen">
      <h1 data-i18n="registerTitle">Chcete ušetriť 50%? Zaregistrujte sa!</h1>
      <p>Zadajte telefónne číslo, alebo si stiahnite našu appku:</p>
      <input
        type="tel"
        id="registerPhoneInput"
        placeholder="0900 000 000"
        data-i18n-placeholder="phonePlaceholder"
        onclick="openKeyboardForInput('registerPhoneInput')"
      />
      <button onclick="sendSMSCodeForRegistration()">
        <i class="fa-solid fa-sms"></i>
        <span data-i18n="sendSMSButton">Odoslať SMS kód a pokračovať</span>
      </button>

      <hr/>
      <p><strong data-i18n="registerSubTitle1">Apple QR</strong></p>
      <p><strong data-i18n="registerSubTitle2">Android QR</strong></p>
      <p><strong data-i18n="registerSubTitle3">Web QR</strong></p>
      <button onclick="navigateTo('loginScreen')">
        <i class="fa-solid fa-user"></i>
        <span data-i18n="alreadyRegisteredButton">Už som registrovaný / mám aplikáciu</span>
      </button>
    </div>

    <!-- LOGIN SCREEN -->
    <div id="loginScreen" class="screen">
      <h1>Prihlásenie</h1>
      <p>Zadajte svoje prihlasovacie údaje:</p>
      <input
        type="text"
        id="loginUsername"
        placeholder="Používateľské meno"
        onclick="openKeyboardForInput('loginUsername')"
      />
      <input
        type="password"
        id="loginPassword"
        placeholder="Heslo"
        onclick="openKeyboardForInput('loginPassword')"
      />
      <!-- For this demo, we just link to ?logged=1 to simulate “logged in” -->
      <button onclick="window.location.href='?logged=1'">
        <i class="fa-solid fa-sign-in"></i>
        <span>Prihlásiť sa</span>
      </button>
    </div>

    <!-- SMS VERIFICATION SCREEN -->
    <div id="smsVerificationScreen" class="screen">
      <h1 data-i18n="smsVerificationTitle">Overenie čísla</h1>
      <p data-i18n="smsVerificationDescription">Zadajte 4-miestny kód...</p>
      <input
        type="text"
        id="smsCodeInput"
        placeholder="0000"
        onclick="openKeyboardForInput('smsCodeInput')"
      />
      <button onclick="verifySMSCode()">
        <i class="fa-solid fa-check-circle"></i>
        <span data-i18n="verifySMSButton">Overiť a pokračovať</span>
      </button>
    </div>

    <!-- MAIN MENU SCREEN (visible after login) -->
    <div id="mainMenuScreen" class="screen">
      <h1>Hlavné menu</h1>
      <button onclick="navigateTo('newOrderScreen')">
        <i class="fa-solid fa-plus-circle"></i>
        <span>Nová objednávka</span>
      </button>
      <button onclick="navigateTo('orderHistoryScreen')">
        <i class="fa-solid fa-history"></i>
        <span>História objednávok</span>
      </button>
      <button onclick="navigateTo('ongoingOrdersScreen')">
        <i class="fa-solid fa-spinner"></i>
        <span>Prebiehajúce objednávky</span>
      </button>
      <button onclick="navigateTo('mapScreen')">
        <i class="fa-solid fa-map"></i>
        <span>Mapa</span>
      </button>
      <button onclick="window.location.href='?logout=1'">
        <i class="fa-solid fa-sign-out"></i>
        <span>Odhlásiť sa</span>
      </button>
    </div>

    <!-- NEW ORDER SCREEN -->
    <div id="newOrderScreen" class="screen">
      <h1>Nová objednávka</h1>
      <p>Vyberte si službu:</p>
      <button onclick="selectService('Pranie + Sušenie + Zloženie')">
        Pranie + Sušenie + Zloženie
      </button>
      <button onclick="selectService('Pranie + Sušenie + Žehlenie + Zloženie')">
        Pranie + Sušenie + Žehlenie + Zloženie
      </button>
      <button onclick="generateOrderCode()">
        <i class="fa-solid fa-check"></i>
        Dokončiť objednávku
      </button>
    </div>

    <!-- ORDER HISTORY SCREEN -->
    <div id="orderHistoryScreen" class="screen">
      <h1>História objednávok</h1>
      <div id="orderHistoryList"></div>
      <button onclick="navigateHome()">
        <i class="fa-solid fa-house"></i> Domov
      </button>
    </div>

    <!-- ONGOING ORDERS SCREEN -->
    <div id="ongoingOrdersScreen" class="screen">
      <h1>Prebiehajúce objednávky</h1>
      <div id="ongoingOrdersList"></div>
      <button onclick="navigateHome()">
        <i class="fa-solid fa-house"></i> Domov
      </button>
    </div>

    <!-- MAP SCREEN -->
    <div id="mapScreen" class="screen">
      <h1>Mapa</h1>
      <p>Zobrazujú sa najbližšie lockerboxy:</p>
      <div style="text-align:center;">
        <lottie-player
          src="assets/lottie/map-animation.json"
          background="transparent"
          speed="1"
          style="width: 300px; height: 300px;"
          autoplay
        ></lottie-player>
      </div>
      <button onclick="navigateHome()">
        <i class="fa-solid fa-house"></i> Domov
      </button>
    </div>

    <!-- TERMS, GDPR, PRICING SCREENS (example) -->
    <div id="termsScreen" class="screen">
      <h1>Obchodné podmienky</h1>
      <p>Tu budú Obchodné podmienky!</p>
    </div>
    <div id="gdprScreen" class="screen">
      <h1>GDPR</h1>
      <p>Tu budú GDPR!</p>
    </div>
    <div id="pricingScreen" class="screen">
      <h1>Cenník</h1>
      <p>Tu bude Cenník!</p>
    </div>

  </div><!-- end .app-wrapper -->

  <!-- BOTTOM NAVIGATION (visible only if logged in) -->
  <?php if ($isLoggedIn): ?>
  <div class="bottom-nav" id="bottomNavBar">
    <div class="nav-item active" onclick="navigateTo('homeScreen')">
      <i class="fa-solid fa-house"></i>
      <span>Domov</span>
    </div>
    <div class="nav-item" onclick="navigateTo('newOrderScreen')">
      <i class="fa-solid fa-plus-circle"></i>
      <span>Objednávka</span>
    </div>
    <div class="nav-item" onclick="navigateTo('mapScreen')">
      <i class="fa-solid fa-map"></i>
      <span>Mapa</span>
    </div>
    <div class="nav-item" onclick="navigateTo('mainMenuScreen')">
      <i class="fa-solid fa-user"></i>
      <span>Profil</span>
    </div>
  </div>
  <?php endif; ?>

  <!-- FOOTER LINKS (public, e.g., Terms, GDPR, Pricing) -->
  <footer style="text-align:center; padding:10px; background:#f1f1f1;">
    <a href="#" onclick="navigateTo('termsScreen')">Obchodné podmienky</a> |
    <a href="#" onclick="navigateTo('gdprScreen')">GDPR</a> |
    <a href="#" onclick="navigateTo('pricingScreen')">Cenník</a>
  </footer>

  <!-- MODAL (optional if you want to show messages) -->
  <div id="messageModal" class="modal">
    <div class="modal-content">
      <p id="modalMessage"></p>
      <button onclick="closeModalMessage()">OK</button>
    </div>
  </div>

  <!-- KEYBOARD container (if you are using the on-screen keyboard approach) -->
  <div id="keyboardContainer">
    <div id="keyboard" style="display:none;"></div>
  </div>

  <!-- Translations (JS) -->
  <script src="js/translations-app.js"></script>
  <!-- The main kiosk logic (JS) -->
  <script src="js/kiosk-app.js"></script>

</body>
</html>
