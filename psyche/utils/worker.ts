/** Utilities for interacting with the service worker. */

export const installServiceWorker = async () => {
  return new Promise((resolve, reject) => {
    if (!("serviceWorker" in navigator)) {
      reject("Missing service worker.");
    }

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/worker-bundle.js")
        .then(resolve, reject);
    });
  });
};
