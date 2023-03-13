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

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {});
