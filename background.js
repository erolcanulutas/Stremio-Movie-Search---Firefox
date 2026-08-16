// Resolves an IMDb ID from Stremio's Cinemeta catalog when a page does not
// expose one in its DOM (Trakt renders client-side and often never links IMDb).
// Running the request here keeps it clear of the page's CSP connect-src.
const CINEMETA_PREFIX = "https://v3-cinemeta.strem.io/catalog/";

browser.runtime.onMessage.addListener((message) => {
  if (!message || message.type !== "cinemetaLookup") return;
  if (typeof message.url !== "string" || !message.url.startsWith(CINEMETA_PREFIX)) {
    return Promise.resolve({ ok: false, error: "rejected url" });
  }

  return fetch(message.url, { credentials: "omit" })
    .then(response => response.ok ? response.json() : Promise.reject(new Error("HTTP " + response.status)))
    .then(data => ({ ok: true, metas: data.metas || [] }))
    .catch(error => ({ ok: false, error: String(error) }));
});
