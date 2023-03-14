import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Create a new Editor instance
const editor = new Editor();

// If editor is undefined, display a loading spinner
if (typeof editor === "undefined") {
  loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // Create a new instance of Workbox
  const workboxSW = new Workbox("/src-sw.js");

  // Register the Workbox service worker
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}
