// kiosk-keyboard.js

// When the DOM is ready, load the keyboard markup from partials/keyboard.html
window.addEventListener('DOMContentLoaded', () => {
  fetch('partials/keyboard.html')
    .then(response => response.text())
    .then(html => {
      // Insert the loaded HTML into our placeholder
      const container = document.getElementById('keyboardContainer');
      container.innerHTML = html;
    })
    .catch(err => {
      console.error("Error loading keyboard partial:", err);
    });
});
