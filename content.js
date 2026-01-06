const imdbRegex = /https?:\/\/www\.imdb\.com\/title\/(tt\d+)\/?$/;
const processedLinks = new WeakSet();

function addStremioButton() {
  browser.storage.local.get(["useStremioApp", "showOnImdb", "showOnTrakt", "showOnGoogle", "showOnDuckDuckGo"], (result) => {
    const useApp = result.useStremioApp !== undefined ? result.useStremioApp : null;
    const showOnImdb = result.showOnImdb !== undefined ? result.showOnImdb : true;
    const showOnTrakt = result.showOnTrakt !== undefined ? result.showOnTrakt : true;
    const showOnGoogle = result.showOnGoogle !== undefined ? result.showOnGoogle : true;
    const showOnDuckDuckGo = result.showOnDuckDuckGo !== undefined ? result.showOnDuckDuckGo : true;

    function appendStremioIcon(imdbLink, titleElement, imdbId, isSeries) {
      if (processedLinks.has(imdbLink) || imdbLink.querySelector(".stremio-button")) return;
      processedLinks.add(imdbLink);

      const stremioAppUrl = isSeries
	   ? `stremio:///detail/series/${imdbId}`           // no slash at the end
	   : `stremio:///detail/movie/${imdbId}/${imdbId}`; // movie format

      const stremioWebUrl = isSeries
        ? `https://web.stremio.com/#/detail/series/${imdbId}`
        : `https://web.stremio.com/#/detail/movie/${imdbId}/${imdbId}`;

      if (!titleElement) return;

      const stremioIcon = document.createElement("img");
      stremioIcon.src = browser.runtime.getURL("icons/stremio.png");
      stremioIcon.alt = "Stremio";
      stremioIcon.classList.add("stremio-button");
      stremioIcon.style = "width: 24px; height: 24px; margin-left: 10px; cursor: pointer; vertical-align: middle;";

      stremioIcon.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();

        let finalUseApp = useApp;
        if (useApp === null) {
          const choice = confirm("Do you want to use the Stremio app? (Click OK for app, Cancel for web)\nThis option can be changed from settings later.");
          finalUseApp = choice;
          browser.storage.local.set({ useStremioApp: finalUseApp });
        }

        const targetUrl = finalUseApp ? stremioAppUrl : stremioWebUrl;

        if (finalUseApp) {
          const appLink = document.createElement("a");
          appLink.href = targetUrl;
          appLink.click();
        } else {
          window.open(targetUrl, '_blank');
        }
      });

      titleElement.appendChild(stremioIcon);
    }

    if (showOnGoogle && window.location.hostname.includes("google.com")) {
      const imdbLinks = [...document.querySelectorAll("a[href*='imdb.com/title/tt']")].filter(a =>
        imdbRegex.test(a.href) && a.textContent.trim().length > 0
      );

      imdbLinks.forEach(imdbLink => {
        const imdbId = imdbLink.href.match(imdbRegex)[1];
        const isSeries = /series|season|episode|tv\s*show|tv\s*series/i.test(imdbLink.textContent);
        const titleElement = imdbLink.querySelector("h3");
        appendStremioIcon(imdbLink, titleElement, imdbId, isSeries);
      });
    } else if (showOnDuckDuckGo && window.location.hostname.includes("duckduckgo.com")) {
      const imdbLinks = [...document.querySelectorAll("article a[href*='imdb.com/title/tt']")].filter(a =>
        imdbRegex.test(a.href) && a.textContent.trim().length > 0 && !a.closest("div.links-deep") // Exclude related searches
      );

      imdbLinks.forEach(imdbLink => {
        const imdbId = imdbLink.href.match(imdbRegex)[1];
        const parentElement = imdbLink.closest("article");
        const isSeries = parentElement && /series|season|episode|tv\s*show|tv\s*series/i.test(parentElement.textContent);
        const titleElement = parentElement?.querySelector("h2 a");
        appendStremioIcon(imdbLink, titleElement, imdbId, isSeries);
      });
    } else if ((showOnImdb && window.location.hostname.includes("imdb.com")) || (showOnTrakt && window.location.hostname.includes("trakt.tv"))) {
      let titleElement, imdbId, isSeries;

      if (window.location.hostname.includes("imdb.com")) {
        titleElement = document.querySelector("h1");
        imdbId = window.location.pathname.match(/tt\d+/)[0];
        isSeries = document.querySelector("a[href*='episodes']") || document.querySelector("title").textContent.includes("Series");
      } else if (window.location.hostname.includes("trakt.tv")) {
        titleElement = document.querySelector("h1 span.year")?.parentElement;

        if (!titleElement) {
          console.log("Stremio Movie Search: Could not find title element on Trakt.tv");
        } else {
          console.log("Stremio Movie Search: Found title element on Trakt.tv", titleElement);
        }

        const imdbLink = document.querySelector("ul.external a[href*='imdb.com/title/tt']");

        imdbId = imdbLink ? imdbLink.href.match(imdbRegex)?.[1] : null;

        if (!imdbId) {
          console.log("Stremio Movie Search: Could not find IMDb ID on Trakt.tv");
        } else {
          console.log("Stremio Movie Search: Found IMDb ID on Trakt.tv", imdbId);
        }

        const ogType = document.querySelector("meta[property='og:type']")?.getAttribute("content");
        isSeries = window.location.pathname.includes("shows") || 
                  ogType === "video.tv_show" || 
                  document.querySelector("meta[content='tv_show']") || 
                  document.querySelector("span[itemprop='keywords']")?.textContent.includes("series");
      }

      if (!titleElement || !imdbId) {
        console.log("Stremio Movie Search: Skipping - missing title element or IMDb ID");
        return;
      }

      appendStremioIcon(titleElement, titleElement, imdbId, isSeries);
    }
  });
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedAddStremioButton = debounce(addStremioButton, 300);

addStremioButton();

const observer = new MutationObserver((mutations) => {
  const shouldRun = mutations.some(mutation => 
    mutation.addedNodes.length > 0 && 
    Array.from(mutation.addedNodes).some(node => node.nodeType === 1 && node.querySelector("a[href*='imdb.com/title/tt']"))
  );
  if (shouldRun) {
    requestAnimationFrame(debouncedAddStremioButton);
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", addStremioButton);