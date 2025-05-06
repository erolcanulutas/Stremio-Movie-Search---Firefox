const imdbRegex = /https?:\/\/www\.imdb\.com\/title\/(tt\d+)\/?$/;

function addStremioButtons() {
  const imdbLinks = [...document.querySelectorAll("a[href*='imdb.com/title/tt']")].filter(a =>
    imdbRegex.test(a.href) && a.textContent.trim().length > 0
  );

  imdbLinks.forEach(imdbLink => {
    if (imdbLink.querySelector(".stremio-button")) return;

    const imdbId = imdbLink.href.match(imdbRegex)[1];
    const isSeries = /series|season|episode|tv\s*show|tv\s*series/i.test(imdbLink.textContent);
    const stremioAppUrl = isSeries
      ? `stremio://detail/series/${imdbId}`
      : `stremio://detail/movie/${imdbId}/${imdbId}`;
    const stremioWebUrl = isSeries
      ? `https://web.stremio.com/#/detail/series/${imdbId}`
      : `https://web.stremio.com/#/detail/movie/${imdbId}/${imdbId}`;

    const titleElement = imdbLink.querySelector("h3");
    if (!titleElement) return;

    const stremioIcon = document.createElement("img");
    stremioIcon.src = browser.runtime.getURL("icons/stremio.png");
    stremioIcon.alt = "Stremio";
    stremioIcon.classList.add("stremio-button");
    stremioIcon.style = "width: 24px; height: 24px; margin-left: 10px; cursor: pointer; vertical-align: middle;";

    stremioIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();

      browser.storage.local.get("useStremioApp", (result) => {
        let useApp = result.useStremioApp !== undefined ? result.useStremioApp : null;

        if (useApp === null) {
          const choice = confirm("Do you want to use the Stremio app? (Click OK for app, Cancel for web)\nThis option can be changed from settings later.");
          useApp = choice;
          browser.storage.local.set({ useStremioApp: useApp });
        }

        const targetUrl = useApp ? stremioAppUrl : stremioWebUrl;

        if (useApp) {
          const appLink = document.createElement("a");
          appLink.href = targetUrl;
          appLink.click();
        } else {
          window.open(targetUrl, '_blank');
        }
      });
    });

    titleElement.appendChild(stremioIcon);
  });
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedAddStremioButtons = debounce(addStremioButtons, 250);

addStremioButtons();

const observer = new MutationObserver(() => {
  requestAnimationFrame(debouncedAddStremioButtons);
});
observer.observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", addStremioButtons);