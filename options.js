function saveOptions() {
  const useStremioApp = document.querySelector('#stremioApp').checked;
  const showOnImdb = document.querySelector('#showOnImdb').checked;
  const showOnTrakt = document.querySelector('#showOnTrakt').checked;
  const showOnGoogle = document.querySelector('#showOnGoogle').checked;
  const showOnDuckDuckGo = document.querySelector('#showOnDuckDuckGo').checked;

  browser.storage.local.set({
    useStremioApp: useStremioApp,
    showOnImdb: showOnImdb,
    showOnTrakt: showOnTrakt,
    showOnGoogle: showOnGoogle,
    showOnDuckDuckGo: showOnDuckDuckGo
  });

  const status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(() => { status.textContent = ''; }, 2000);
}

// Chrome answers with a callback, Firefox with a promise. Accept either.
function readSettings(defaults) {
  return new Promise(resolve => {
    let settled = false;
    const done = (value) => {
      if (settled) return;
      settled = true;
      resolve(value || defaults);
    };

    setTimeout(() => done(defaults), 1000);

    try {
      const maybePromise = browser.storage.local.get(defaults, done);
      if (maybePromise && typeof maybePromise.then === "function") {
        maybePromise.then(done, () => done(defaults));
      }
    } catch (error) {
      done(defaults);
    }
  });
}

function restoreOptions() {
  readSettings({
    useStremioApp: null,
    showOnImdb: true,
    showOnTrakt: true,
    showOnGoogle: true,
    showOnDuckDuckGo: true
  }).then((result) => {
    document.querySelector('#stremioApp').checked = result.useStremioApp === true;
    document.querySelector('#stremioWeb').checked = result.useStremioApp === false || result.useStremioApp === null;
    document.querySelector('#showOnImdb').checked = result.showOnImdb;
    document.querySelector('#showOnTrakt').checked = result.showOnTrakt;
    document.querySelector('#showOnGoogle').checked = result.showOnGoogle;
    document.querySelector('#showOnDuckDuckGo').checked = result.showOnDuckDuckGo;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);