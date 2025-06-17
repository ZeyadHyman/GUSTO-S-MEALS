import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Browser compatibility check
const checkBrowserCompatibility = () => {
  const isIE = /MSIE|Trident/.test(window.navigator.userAgent);
  const isOldEdge = /Edge/.test(window.navigator.userAgent);

  if (isIE || isOldEdge) {
    const warning = document.createElement("div");
    warning.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: #ff4444;
      color: white;
      padding: 1rem;
      text-align: center;
      z-index: 9999;
    `;
    warning.innerHTML = `
      <p>Your browser is not fully supported. For the best experience, please use a modern browser like Chrome, Firefox, Safari, or Edge.</p>
    `;
    document.body.appendChild(warning);
  }
};

// Check for required features
const checkRequiredFeatures = () => {
  const requiredFeatures = [
    "IntersectionObserver" in window,
    "ResizeObserver" in window,
    "fetch" in window,
    "Promise" in window,
    "localStorage" in window,
  ];

  if (!requiredFeatures.every(Boolean)) {
    console.warn("Some required features are not supported in this browser");
  }
};

// Run compatibility checks
checkBrowserCompatibility();
checkRequiredFeatures();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
