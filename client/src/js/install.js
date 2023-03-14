// Get a reference to the install button element in the DOM.
const butInstall = document.getElementById("buttonInstall");

// Listen for the beforeinstallprompt event and store the event object in a global variable.
window.addEventListener("beforeinstallprompt", (event) => {
  window.deferredPrompt = event;
  // Show the install button.
  butInstall.classList.toggle("hidden", false);
});

// Listen for clicks on the install button.
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  // If there is no event object, do nothing.
  if (!promptEvent) {
    return;
  }

  // Show the install prompt.
  promptEvent.prompt();

  // Clear the event object.
  window.deferredPrompt = null;

  // Hide the install button.
  butInstall.classList.toggle("hidden", true);
});

// Listen for the appinstalled event and clear the event object.
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
