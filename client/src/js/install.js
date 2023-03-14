// Get the button element by its ID
const butInstall = document.getElementById("buttonInstall");

// Listen for the beforeinstallprompt event
window.addEventListener("beforeinstallprompt", (event) => {
  // Save the event in a deferredPrompt property of the window object
  window.deferredPrompt = event;

  // Show the button to install the app
  butInstall.classList.toggle("hidden", false);
});

// Listen for a click on the button
butInstall.addEventListener("click", async () => {
  // Get the saved deferredPrompt
  const promptEvent = window.deferredPrompt;

  // If deferredPrompt is null, do nothing
  if (!promptEvent) {
    return;
  }

  // Show the installation prompt
  promptEvent.prompt();

  // Set deferredPrompt to null
  window.deferredPrompt = null;

  // Hide the button to install the app
  butInstall.classList.toggle("hidden", true);
});

// Listen for the appinstalled event
window.addEventListener("appinstalled", (event) => {
  // Set deferredPrompt to null
  window.deferredPrompt = null;
});
