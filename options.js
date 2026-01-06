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
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => { status.textContent = ''; }, 2000);
  });
}

function restoreOptions() {
  browser.storage.local.get({
    useStremioApp: null,
    showOnImdb: true,
    showOnTrakt: true,
    showOnGoogle: true,
    showOnDuckDuckGo: true
  }, (result) => {
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