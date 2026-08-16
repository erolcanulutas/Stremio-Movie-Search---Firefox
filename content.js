const DEBUG = false;
function log(...args) {
  if (DEBUG) console.log("Stremio Movie Search:", ...args);
}

// Inlined so the icon survives strict page CSPs. DuckDuckGo sends
// `img-src data: https://*.duckduckgo.com ...` with no extension scheme, which
// blocks chrome-extension:/moz-extension: image URLs. `data:` is allowed.
const STREMIO_ICON_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE7mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDEgNzkuMTQ2Mjg5OSwgMjAyMy8wNi8yNS0yMDowMTo1NSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI1LjAgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNS0wMi0xN1QyMjozNjoxOSswMjowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyNS0wMi0xN1QyMjozNjoxOSswMjowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjUtMDItMTdUMjI6MzY6MTkrMDI6MDAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRhNGZmY2MwLTYwNzAtMDg0Ni05ODUzLTY1OWQxYzA5ZjAxOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0YTRmZmNjMC02MDcwLTA4NDYtOTg1My02NTlkMWMwOWYwMTkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0YTRmZmNjMC02MDcwLTA4NDYtOTg1My02NTlkMWMwOWYwMTkiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRhNGZmY2MwLTYwNzAtMDg0Ni05ODUzLTY1OWQxYzA5ZjAxOSIgc3RFdnQ6d2hlbj0iMjAyNS0wMi0xN1QyMjozNjoxOSswMjowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI1LjAgKFdpbmRvd3MpIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po6+fBgAAA8bSURBVHic1Z1trBzXWcd/z+yu7euXvOA6pE7tNE68uUGVMNl77RiKDFKQUFS1AsR7P6CCqMqnqCLAB6hQWhqpOEpJq5BaQiQBqRWVikBVhQpIiILt9Nqt84EqMkntOE7KvXed2L43jnO9cx4+zMzuvJ2ZM7uzL/6vRnd35jmvzzn/8zzPnLkjv/Pxy6CAggcIEv6NDstvCX5HaaLr/d8CoowLvw58FHgoLPZ7wD8DL4iEEhK0KRfxazY5i4wKqAqKQQETikTfVRQUjEbngoSGfjdj0H7/Nau1eybwTwSdH8c9wK8AnwA+inB14rUaEt60K1ARx8l2fhxHVFlC2T6pCo2Km0UBApwEDjvItm8mJdwsCjgBHKogP6/KaeCWMdWnNtwMCjhOtc6PEMwE2I6Uyk4Ns6wAD3fasWHmlTDLCqhKOzbMq5ldOppVBRwHDtaYX1sNp2D2FuZZU0AdtGPD/pCOdowh76Exawqoi3ZsmFflFDNER7OkgLppx4a2mtmZCbOggHHSjg0D62jKmAUFjJt2bLh/Fpy1aStgUrRjw9TpaFoKqBLbGTemSkfTUsC0aMeGqdHRNBQwbGxn3GhPw0+YpAKmYe1URVuV7zJBOpqkAmaNdmyYaCh7UgqYtrVTFZF1NPaZMG4F3Ay0Y8NErKNxK+BmoR0bxk5H41OAclzhYLQVw+WYUYyVjsahAAFOGjgc3wvjcpjYUSXdBJTYp6O6b6zVui8o3L90UtH+ghvf2+SeS7Izo7TqkE9aCcN0mCXNvCqnRVhEuFqXtmtVgBZYO7bNZy6SmvpeRZnDKKSgb9tiWBLRjiLrdcy5uhQgwAmtuOBWnx3JdOVp7cqsOiNj6duiLBHMhPVRdVCLAgLaCUb+MFPevUPtaetQYv7sylXivCinERYQ1kZRwkgKCDn/ODmcH5ex/crDsBw+CvcPQ3EKbQynEDqjzIRRFCDqYOcnR1q1WnoCqtBdMRgfdt7h0WoJxpSnndCsaqMsyQh0VFkB/UrpgHbyBbKoShcGuPy28uDPtNi0BV78jx5qDLvu9AIlODY4O6rdauBIU/NqOC0ei1B9V/ZQM0AJnKz0eYlqWJ4+my4Hq/9n+PmPbOITj24B4KGf6/HCl6/z6lnDnns8mk1Qh9mQLVMLyy1Ln1SCQOSsiXaA9QrZVnPEgmcu9KSih5Xok3WkqjpPeQ6YUdh4DxY+PBgjBw41+fyxbTz8sRavnzO8fUkRL6CpwqNCuVXrHPWCQduqLElFj7mSAkJr51CyMtmPiR1un/xOkSasryXH7pY54Q/+ZI5Pf3aO5mY4/6rBaNASa2eWKUjDJ1pGUGL4e96E2yBdZ5ezAhSOGzg4SnjBnjb/Y1DUQmkffrjFE1/ZxsEjTc7/0OfqFYPX0Aplltc1kdZRiUZpG+O+IbhUAeGjXicVDo9KNcOkLcLOXR5//PmtfPKPtvDeBlw4b8DTgChrnpEV29g2jrGjUgXk046dQ10rW2WEluGRX97MXzyzjQd+ssGrZ32uvat4jVEGwOi0atCIjnYUzYQyBRxX9KBjgf3KJSs5Gk254u59DT73pe389u9v4a23lDcuGqsSRqGpamm1bbR4V7ZNAaJDhpSzlXSd9vbRVgW/9btbePypbdx1t8fZl31u9AgspQqdOmxbLdfbxtito4wCwvDCiTjtjBqnH6Vh1bo/wIcONDl6bAcf+43NvPmGz+qqQQpmQ1l9R6VVA/NGOS2wQ1J0lFGAoscVPeRiJg4/K9zTDItWCz716Tn+9IltbL9VeOVsD18VvOozMUur5dSabmu4MJ8CtseVEFdAwZ0sN6oo/gw3K0bFQz/b4qljO3j4kc2cP+dz+bJWmg32Th2KWtvGaOL2ZqQAAU6YEWhnJFu/RHGj4pZbhcc+s5XH/mwbCpw75wf5yth4vyhdZB1tFwKrGaP6LYMeio/oeMekz9uOPGXYDpvy0ked+IVHNvHUszs4eLjJK6/0WFsfmKt1WEQV0rWN4Ts9A54x+ktG+cWyzF0KyVdKOX3lKTHKr44ZEMf77/J4/As7+NSjc6y9Y3j9dT/woCVbt2Fp1UUZBg748MmmUf09oO/yp30GTZ3TdBxQ7LLRuUgs73oaUZcPFFC3CgL86m/OcaDT4uknr/HaeZ877vCCmFKiLkm43C2riEc9Az8d15wfHqkVPGHXR4ePYnRwqCZ/xw+/5HoYRwkO6luEi7C/3eTpZ29h7z0el94yJTO4PlqNHbuaBvXyRmW+9t3GgG2UF48oTXwNgltqDcbVBRHYf3+TH/zgOrfc1shc15xvru1Lyuenaip8X+GILfOINgbEkM44KWeryICCJJEmv7LBNd8iUydeOnOD//6vDXa+L6AgAVSKqbKcmvLkcxV4pWkwz4EcSaXJdK6tOLtcFoES3Lt0XPwf4bnnrvF3z19j6zaP228XfD8oL/ynV04o+sdcmb4Kf+rg99828RrPqzGPKfxEWWdm96xVpSD3O7MRj44Dr73mc/ToOi++uMHuuxrs2C70/GTZaVShHdscT9HpGyhPND3x1Pf0iG/80x6yN78YydF01qYpoqD4lTI5Ibng14lv/OO7fOXYO6ytKffuDzj/hp+khzxrzeScy6NVKKdWYEWEhwA/uuHaFVgwcAbYnS3ARgaaknPDYFGyp6p7Brz9tuELT67xL9++zo/f0eCD+xr0enEjOa+O2TrlyblSZZhn1xPpiHBRNdoVoQCyqvCgoksCe5KLajF1aOpvkexALpkqL8+6HLFv//t1vvTMOm/+yGffvU0aDdjoxcvNluK60FahVQNdz2MBuBgVkN6WsqzQMXBKYK/NBHPplCzNFDUhu2WrjhmwsaH85V+t8fVvXOO22zz23dvA+ErPDGijiAbLLLv4lXI5VjxhUZAL8ZN5+4JWURYMeoYYHcUrlTxjRzL2na1anOLSCMzQ4T3hE999j6NPr/Hy//bY98EmrRbc8IvLzK+bG4psfaArQodo5MfEbBuzQjpiCdhjr0yWPhKjJtXGdCVt1CUkPeKq+OJfX+X5r12j1RLa7QbGKL7JK7PcpB6OVgdyCl1PWBCRi3mZWXfGCSwb6Ch6Ctg7GP3Zato6Nq/imtv0TKWDQ6uN//95+Qafe/IKS9/fYN/dTebmpD/q85E/K4sQWWipiFhOvgIR7YhcsDWkbGviqsICcEb7dGTrkvRylES64mXOS9U14G/+fp1nnltj4z14YL6JMdDztZRGkh1pHx4JFpD8EEVcDrTrCR3byI9QujdUYNWE1hGwJ1vpAYpDEPkyWfoaTGbfwQu4+GaPPz96hX/7z+t8YHeD99/p0fPdQiPJa3Ep21wP/2aoNTn7Fe16IgsiFHY+uG/OXVboKPTpKCismE7i1+y0NBjx8UU+iMsXrwFf/+Y7HH32KpfeMtzfbiIETlU6ryIUUUng/6TdrDxovLyVhrAowgWXQGKV3dGrii5o6Ky5xIAEyfUgk0g6cxGi+67NZjb3K1cNj3/xMv/wzXfYtbPBffc28XuD9SKZl5sPk0clQd3t61A8r7CdXRHpgGSsHRuqbk/PWEdFFYvfXLHJRMj6AcK7G0qzmZT81++8y2efvswPL/S4754WzSbc6GkqbfaXg52eI5dvrOblpdBtCE60E8cwzwcsKyyEHnNO7MhlyjpYG6LcervHsa+u8cB9m9g6J3z5hasc++oa27cJ9+9vxZyq8tzFYUjGLbAiNy0nlxVPZBHBau1Yy/y1j1/GNz6+mn4ALNiOrWE8XlN3wvphgl2qydhRuiGSPlkmk0KrJfxoucf7fqzB5pZw9lyPu+5ssGWz4PvJfHKKyBRdVJ6LTCAnifLCkf9TDZGLouAh4RE4oo3wtxBsQfEQPJF+yHuUZ8RWFe3TUbwhuU6Mpg2+HJlEQ4NQwq6dDa6uK1fUcPcHBtFLCw1Y8yoe08kBUSRjYua2gW4jtHaqeM1xjPqYasY6Sk7hOJKLrat9bgxs3SqA4GtapgKtiN1PKR8QyXB84J/oSiNOO8P0PvU8J5xrHblYDpoYd1m5Mi6O52KDDMQKrbXiPtRUvel6Hh0qLrh5qOtJeWfrKN9eyRqNRSMybViW0UoZ9xdZa+l8iGiH0TsfavxfEQLLivZD2QVyDmeK/OX0GXsvlPsqNostuawnnCyPRYELucmGQN1vUVoFFnz0jCC788aebW1IyyRTushkEcgUmcVFJDi4Hsakug2hIxWcLBeM4zVW/TtrwJ40vbg4QgP6yW+lqxUVEUu5TJHFr4D0nay69ymN5T1iAssG7RjklKB785behHR+HrjSi02ijF5cYjzASkN0UUQuqNY28PsY34vchFVUF3zljKC5d9YSnWxpmU095YEyN3qhQEah2xQpDSmPgnG/SW8VeNDEQtkQt3RizY41sHzx1L7yEtdzvG17HmKVCRUS3sniYm7ymjD2VxlK/84aqTtrUDvFJAg62cFZpExfSWSx0vRid7Lq5p0YJvIuSYFVE3PWwnPFKUoIxoViBjk5BP8GjlpAOzXZ+WWY2Ms8JbSOfFiSAmctQFEwOJFnTDp71dVagoGp2Qxuplx0uxEzOib9NtVl0AUTeMx7oWhkSs63rIPmTDEFpYRe7kpLZFEI7mSlHycdFyb+OluBFSXadySJbZBJJDu72KR0o2nbqqDopWa4XXAStBPHtN4nnLCOihw0O80kZ4i7g5cxAbqtiHYm3Pkw3Rc6J+hILF1tj1QWqcSOVCkh7dj37YwbU32jtggrmGhXtu4uoplCayZj/xevLGFfX2oJ/V3KE6L8DKb+SnPJoaOMROxb7kBNOdMO++m6LU8WvTE7WS6YugLCrlomeD4hxzpyWYyTsCkxmEE6sHYc8xsnpq6ACCKsiOqC7+ys5Ruq+df7c+LSZqEjBPdwZwHTfpFbGqsCDwKvR3egio68Z5czzzEP/nabXsD502laPmZNAQgse7BQ112ncBvNSkvoePDaNEzNIsycAiLz0At2Zb9ZQ16XNgkdz3Gv5qQxcwqIYdUL6WiYxJGTtcmj403JyXLBLCsAAjrqUJGOQutmZdOM0k4cM62AsN9WpQIdxZ2sWaWdOGZaARGkGh11A86XmaWdOG4KBYRY9qAj8FKBzNmWsODJbNNOHDeNAkJeXxXhAPCHwPeAFYJQxkvAZ4APzTrnp/H/3baaGoYttSwAAAAASUVORK5CYII=";

const IMDB_LINK_SELECTOR = "a[href*='imdb.com/title/tt']";
const IMDB_ID_REGEX = /\/\/(?:www\.|m\.)?imdb\.com\/title\/(tt\d+)/;
const SERIES_TEXT_REGEX = /series|season|episode|tv\s*show|tv\s*series/i;
const CINEMETA_BASE = "https://v3-cinemeta.strem.io/catalog/";

// DuckDuckGo and Trakt both render well after document_end, so keep re-checking
// for a bounded window instead of giving up on the first pass.
const RETRY_INTERVAL = 400;
const MAX_RETRIES = 38;          // ~15s

const isDuckDuckGo = window.location.hostname.endsWith("duckduckgo.com");
const isTrakt = window.location.hostname.endsWith("trakt.tv");
const isGoogle = /(^|\.)google\.[a-z.]+$/.test(window.location.hostname);
const isImdb = window.location.hostname.endsWith("imdb.com");

let processedLinks = new WeakSet();
let iconPlaced = false;
let cinemetaTried = false;
let currentHref = window.location.href;
let retryTimer = null;
let tick = 0;

function extractImdbId(href) {
  if (!href) return null;
  const match = String(href).match(IMDB_ID_REGEX);
  return match ? match[1] : null;
}

// First selector in the list that matches a non-empty element inside `scope`.
function pickTitle(scope, selectors) {
  for (const selector of selectors) {
    const candidate = scope.querySelector(selector);
    if (candidate && candidate.textContent.trim()) return candidate;
  }
  return null;
}

function inFooter(element) {
  // Trakt's footer carries a .trakt-external-links block of app-store links that
  // would otherwise be mistaken for the title area.
  return !!element.closest("footer, [class*='footer']");
}

// Chrome hands settings back through a callback; Firefox returns a promise and
// may ignore or reject the callback form. Accept both, and never let a storage
// hiccup take the whole extension down with it -- fall back to defaults instead.
function readSettings(keys) {
  return new Promise(resolve => {
    let settled = false;
    const done = (value) => {
      if (settled) return;
      settled = true;
      resolve(value || {});
    };

    setTimeout(() => {
      if (!settled) log("storage did not answer, using defaults");
      done({});
    }, 1000);

    try {
      const maybePromise = browser.storage.local.get(keys, done);
      if (maybePromise && typeof maybePromise.then === "function") {
        maybePromise.then(done, error => { log("storage rejected", error); done({}); });
      }
    } catch (error) {
      log("storage threw", error);
      done({});
    }
  });
}

function addStremioButton() {
  readSettings(["useStremioApp", "showOnImdb", "showOnTrakt", "showOnGoogle", "showOnDuckDuckGo"]).then((result) => {
    const useApp = result.useStremioApp !== undefined ? result.useStremioApp : null;
    const showOnImdb = result.showOnImdb !== undefined ? result.showOnImdb : true;
    const showOnTrakt = result.showOnTrakt !== undefined ? result.showOnTrakt : true;
    const showOnGoogle = result.showOnGoogle !== undefined ? result.showOnGoogle : true;
    const showOnDuckDuckGo = result.showOnDuckDuckGo !== undefined ? result.showOnDuckDuckGo : true;

    function appendStremioIcon(keyElement, titleElement, imdbId, isSeries) {
      if (!keyElement || !titleElement || !imdbId) return false;
      if (processedLinks.has(keyElement) || titleElement.querySelector(".stremio-button")) return false;
      processedLinks.add(keyElement);

      const stremioAppUrl = isSeries
        ? `stremio:///detail/series/${imdbId}`
        : `stremio:///detail/movie/${imdbId}/${imdbId}`;
      const stremioWebUrl = isSeries
        ? `https://web.stremio.com/#/detail/series/${imdbId}`
        : `https://web.stremio.com/#/detail/movie/${imdbId}/${imdbId}`;

      const stremioIcon = document.createElement("img");
      stremioIcon.src = STREMIO_ICON_DATA_URL;
      stremioIcon.alt = "Stremio";
      stremioIcon.title = "Open in Stremio";
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
      iconPlaced = true;
      log("icon placed", imdbId, isSeries ? "series" : "movie");
      return true;
    }

    if (showOnGoogle && isGoogle) {
      // Desktop Google puts an <h3> inside the result link. Mobile does not, so
      // fall back to the surrounding result block the same way DuckDuckGo does.
      const RESULT_CONTAINERS = "div[data-hveid], div.g, div[jscontroller], li, article";
      const TITLE_CANDIDATES = ["h3", "[role='heading']", "h2"];

      document.querySelectorAll(IMDB_LINK_SELECTOR).forEach(imdbLink => {
        const imdbId = extractImdbId(imdbLink.href);
        if (!imdbId) return;

        let titleElement = pickTitle(imdbLink, TITLE_CANDIDATES);
        const container = titleElement ? null : imdbLink.closest(RESULT_CONTAINERS);
        if (!titleElement && container) titleElement = pickTitle(container, TITLE_CANDIDATES);
        if (!titleElement && imdbLink.textContent.trim()) titleElement = imdbLink;
        if (!titleElement) return;

        const isSeries = SERIES_TEXT_REGEX.test((container || imdbLink).textContent);
        appendStremioIcon(container || imdbLink, titleElement, imdbId, isSeries);
      });
    } else if (showOnDuckDuckGo && isDuckDuckGo) {
      // DuckDuckGo's SERP markup shifts; never bail because one selector missed.
      const RESULT_CONTAINERS = "article, [data-testid='result'], li[data-layout], .result, .web-result";
      const TITLE_CANDIDATES = ["[data-testid='result-title-a']", "h2 a", "h3 a", "h2", "h3"];

      document.querySelectorAll(IMDB_LINK_SELECTOR).forEach(imdbLink => {
        const imdbId = extractImdbId(imdbLink.href);
        if (!imdbId) return;

        const container = imdbLink.closest(RESULT_CONTAINERS);
        let titleElement = container ? pickTitle(container, TITLE_CANDIDATES) : null;
        if (!titleElement) titleElement = imdbLink;
        if (!titleElement.textContent.trim()) return;

        const scopeText = (container || imdbLink).textContent;
        const isSeries = SERIES_TEXT_REGEX.test(scopeText);
        // Key on the container so an extras/sitelink anchor cannot add a second icon.
        appendStremioIcon(container || imdbLink, titleElement, imdbId, isSeries);
      });
    } else if (showOnImdb && isImdb) {
      const titleElement = document.querySelector("h1");
      const imdbId = extractImdbId(window.location.href);
      const isSeries = !!document.querySelector("a[href*='episodes']") ||
        (document.title || "").includes("Series");
      appendStremioIcon(titleElement, titleElement, imdbId, isSeries);
    } else if (showOnTrakt && isTrakt) {
      const titleElement = findTraktTitle();
      const imdbId = findTraktImdbId();
      const isSeries = isTraktSeries();

      if (titleElement && imdbId) {
        appendStremioIcon(titleElement, titleElement, imdbId, isSeries);
        return;
      }

      // Measured against the live page: app.trakt.tv renders zero IMDb links, so
      // the DOM branch above never fires there and Cinemeta is the only route.
      // Start it as soon as there is a title to hang the icon on -- waiting for a
      // DOM link that never arrives just delays the icon by seconds.
      if (titleElement && !imdbId && !cinemetaTried) {
        cinemetaTried = true;
        const slug = parseTraktSlug();
        if (!slug) return;
        // Trakt answers unknown slugs with a soft 404 that still has an <h1>
        // ("404: Nothingness. The void."). Without this check the slug would be
        // looked up anyway and an icon pinned to the error page.
        if (!looksLikeTitle(titleElement.textContent, slug.name)) {
          log("title does not match slug, not a title page:", titleElement.textContent.trim());
          return;
        }

        log("falling back to Cinemeta for", slug);
        lookupImdbId(slug.type, slug.name, slug.fullName, slug.year).then(foundId => {
          if (!foundId || iconPlaced) return;
          const target = findTraktTitle();
          if (!target || !looksLikeTitle(target.textContent, slug.name)) return;
          appendStremioIcon(target, target, foundId, slug.type === "series");
        });
      }
    }
  });
}

/* ---------- Trakt helpers ---------- */

function findTraktTitle() {
  const legacy = document.querySelector("h1 span.year");
  if (legacy && legacy.parentElement && !inFooter(legacy)) return legacy.parentElement;

  for (const selector of ["main h1", "[class*='title'] h1", "h1"]) {
    const heading = [...document.querySelectorAll(selector)]
      .find(element => !inFooter(element) && element.textContent.trim());
    if (heading) return heading;
  }
  return null;
}

function findTraktImdbId() {
  for (const link of document.querySelectorAll(IMDB_LINK_SELECTOR)) {
    if (inFooter(link)) continue;
    const imdbId = extractImdbId(link.href);
    if (imdbId) return imdbId;
  }
  return null;
}

// Does the heading actually name the title the slug asks for? Lenient, because
// Trakt shows localised or shortened titles ("the-office-us" renders "The Office").
function looksLikeTitle(text, slugName) {
  const heading = normalizeTitle(text);
  const wanted = normalizeTitle(slugName);
  if (!heading || !wanted) return false;
  if (heading === wanted || heading.startsWith(wanted) || wanted.startsWith(heading)) return true;

  const headingWords = new Set(heading.split(" "));
  const wantedWords = wanted.split(" ");
  const shared = wantedWords.filter(word => headingWords.has(word)).length;
  return shared / wantedWords.length >= 0.5;
}

function isTraktSeries() {
  const ogType = document.querySelector("meta[property='og:type']")?.getAttribute("content");
  if (ogType === "video.tv_show") return true;
  if (ogType === "video.movie") return false;
  return window.location.pathname.startsWith("/shows/");
}

function parseTraktSlug() {
  const match = window.location.pathname.match(/^\/(movies|shows)\/([^\/?#]+)/);
  if (!match) return null;

  const type = match[1] === "shows" ? "series" : "movie";
  const slug = decodeURIComponent(match[2]);
  const fullName = slug.replace(/-/g, " ").trim();

  // Trakt disambiguates with a trailing release year ("inception-2010"), but some
  // titles genuinely end in a number ("blade-runner-2049"), so keep both readings.
  let name = fullName;
  let year = null;
  const yearMatch = slug.match(/-((?:19|20)\d{2})$/);
  if (yearMatch) {
    year = yearMatch[1];
    name = slug.slice(0, -yearMatch[0].length).replace(/-/g, " ").trim() || fullName;
  }

  return fullName ? { type, name, fullName, year } : null;
}

/* ---------- Cinemeta lookup ---------- */

function normalizeTitle(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function nameScore(candidate, target) {
  if (!target) return 0;
  if (candidate === target) return 4;
  if (candidate.startsWith(target + " ")) return 3;
  return 0;
}

// The slug title is rarely Cinemeta's title verbatim: Trakt's "dune-2021" matches
// a meta named "Dune: Part One", while "blade-runner-2049" only looks like it
// carries a year. Score the year and both readings of the slug rather than
// filtering on an exact name first.
function scoreCinemetaMatch(meta, name, fullName, year) {
  const candidate = normalizeTitle(meta.name);

  const base = nameScore(candidate, name);
  // A full-slug exact hit outranks a stripped-slug exact hit, so
  // "blade-runner-2049" prefers "Blade Runner 2049" over "Blade Runner".
  const full = fullName !== name ? nameScore(candidate, fullName) : 0;
  let score = Math.max(base, full === 4 ? 5 : full);

  if (year && String(meta.releaseInfo || "").startsWith(year)) score += 2;
  return score;
}

function pickCinemetaMatch(metas, name, fullName, year) {
  if (!Array.isArray(metas) || metas.length === 0) return null;

  const target = normalizeTitle(name);
  const fullTarget = normalizeTitle(fullName || name);
  let chosen = null;
  let best = 0;

  // Cinemeta returns results in relevance order, so only a strictly better score
  // displaces an earlier candidate.
  for (const meta of metas) {
    const score = scoreCinemetaMatch(meta, target, fullTarget, year);
    if (score > best) {
      best = score;
      chosen = meta;
    }
  }

  // A year alone scores 2 and is not enough: matching only the year would happily
  // deep-link "Planet Dune" for "dune-2021". A wrong title is worse than no icon.
  // With no year to go on, fall back to Cinemeta's own top result.
  if (best < 3) chosen = year ? null : metas[0];

  const imdbId = chosen && (chosen.imdb_id || chosen.id);
  return /^tt\d+$/.test(imdbId || "") ? imdbId : null;
}

async function lookupImdbId(type, name, fullName, year) {
  // Search on the stripped name for recall; the scorer sorts out which result fits.
  const url = `${CINEMETA_BASE}${type}/top/search=${encodeURIComponent(name)}.json`;

  // Prefer the background script: it holds the host permission and is not
  // subject to the page's CSP connect-src.
  try {
    const response = await browser.runtime.sendMessage({ type: "cinemetaLookup", url });
    if (response && response.ok) return pickCinemetaMatch(response.metas, name, fullName, year);
    log("background lookup returned", response);
  } catch (error) {
    log("background lookup failed", error);
  }

  // Cinemeta sends Access-Control-Allow-Origin: *, so a direct CORS fetch still
  // works when the optional host permission was never granted (Firefox MV3).
  try {
    const response = await fetch(url, { credentials: "omit" });
    if (response.ok) {
      const data = await response.json();
      return pickCinemetaMatch(data.metas, name, fullName, year);
    }
  } catch (error) {
    log("direct lookup failed", error);
  }

  return null;
}

/* ---------- scheduling ---------- */

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const debouncedAddStremioButton = debounce(addStremioButton, 300);

function scheduleRetries() {
  clearInterval(retryTimer);
  tick = 0;
  retryTimer = setInterval(() => {
    tick += 1;
    if (tick > MAX_RETRIES) {
      clearInterval(retryTimer);
      retryTimer = null;
      return;
    }
    addStremioButton();
  }, RETRY_INTERVAL);
}

function resetForNewPage() {
  processedLinks = new WeakSet();
  iconPlaced = false;
  cinemetaTried = false;
  document.querySelectorAll(".stremio-button").forEach(icon => icon.remove());
  scheduleRetries();
  addStremioButton();
}

// Trakt (SvelteKit) and DuckDuckGo swap content without a page load.
setInterval(() => {
  if (window.location.href !== currentHref) {
    currentHref = window.location.href;
    log("route change", currentHref);
    resetForNewPage();
  }
}, 500);

// These two render asynchronously, so any mutation is worth a (debounced) recheck.
const alwaysRecheck = isDuckDuckGo || isTrakt;

const observer = new MutationObserver((mutations) => {
  const shouldRun = mutations.some(mutation =>
    Array.from(mutation.addedNodes).some(node => {
      if (node.nodeType !== 1) return false;
      if (node.classList && node.classList.contains("stremio-button")) return false;
      return alwaysRecheck ||
        node.matches?.(IMDB_LINK_SELECTOR) ||
        node.querySelector?.(IMDB_LINK_SELECTOR);
    })
  );
  if (shouldRun) {
    requestAnimationFrame(debouncedAddStremioButton);
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });

document.addEventListener("DOMContentLoaded", addStremioButton);

addStremioButton();
scheduleRetries();
