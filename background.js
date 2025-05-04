chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "fetchMetadata") {
    const metadataUrl = `https://v3-cinemeta.strem.io/meta/movie/${request.imdbId}.json`;

    fetch(metadataUrl)
      .then(response => response.json())
      .then(data => {
        sendResponse({ success: true, metadata: data });
      })
      .catch(error => {
        console.error("Metadata request failed:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; // Keeps the message channel open for async response
  }
});
