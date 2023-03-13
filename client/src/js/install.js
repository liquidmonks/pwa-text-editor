// Get the install button element
const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// This event fires when the user is about to be prompted to install a web application
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("hit");
  console.log("event" + event);
  event.preventDefault();
  // Save the event for later use
  window.deferredPrompt = event;
});

// Remove the hidden class from the button
butInstall.classList.toggle("hidden", false);

butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;
  // console.log(promptEvent)
  if (!promptEvent) {
    return;
  }

  // Show prompt
  promptEvent.prompt();

  // Reset the deferred prompt variable, it can only be used one.
  window.deferredPrompt = null;

  // Hide the install button
  butInstall.classList.toggle("hidden", true);
});

// Resets the deferred prompt variable
window.addEventListener("appinstalled", (event) => {
  console.log("install hit");
  window.deferredPrompt = null;
});
