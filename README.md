# Stremio Movie Search (Firefox)

A Firefox extension that adds a Stremio button next to movie and TV show titles on Google, DuckDuckGo, IMDb and Trakt.tv, letting you open them in Stremio (app or web) with a single click.

![screenshot](https://github.com/user-attachments/assets/24584117-6185-4d01-a0df-5a7fdc549815)

## Overview

Stremio Movie Search finds the IMDb ID behind a result and adds a Stremio icon next to the title. Click it to launch either the Stremio app or the Stremio web player — your choice, configurable in settings. It keeps up with dynamically loaded results and single-page sites, and each supported site can be switched on or off individually.

## Features
- Works on Google (including country domains such as `google.com.tr`), DuckDuckGo, IMDb and Trakt.tv.
- Supports both movies and TV series with accurate deep links.
- User-configurable: choose between the Stremio app or the web player (opens in a new tab).
- First-time prompt to select app or web, changeable later in settings.
- Per-site toggles — turn the button on or off for each site individually.
- Works on Firefox for Android.
- No tracking, no analytics, no account required.

## Installation

### From the Firefox Add-ons Marketplace
1. Visit the [Stremio Movie Search page](https://addons.mozilla.org/en-US/firefox/addon/stremio-movie-search/) on the Firefox Add-ons Marketplace.
2. Install it and follow the prompts.
3. Optionally, install the Stremio app for app mode.

### Local Testing (Developers)
1. Clone this repository:
   ```
   git clone https://github.com/erolcanulutas/Stremio-Movie-Search---Firefox.git
   ```
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
3. Click "Load Temporary Add-on" and select the `manifest.json` file from the cloned directory.
4. The extension will load temporarily (until Firefox restarts) for testing.

> If the store version is already installed, remove it first. Both share the same
> extension ID, and a temporary add-on cannot coexist with an installed one — they
> will deactivate each other.

To test on Android, with USB debugging enabled and Firefox Nightly installed:
```
web-ext run -t firefox-android --android-device=<device-id> --firefox-apk=org.mozilla.fenix
```

### Requirements
- Firefox browser (latest version recommended).
- Stremio app installed for app mode (available at [stremio.com](https://www.stremio.com)), or use web mode without the app.

## Usage
1. Search for a movie or TV series on Google or DuckDuckGo, or open a title page on IMDb or Trakt.tv.
2. On first use, a prompt asks whether to use the Stremio app or the web player (changeable in settings).
3. Click the Stremio icon next to the title:
   - App mode: opens in the Stremio app (movies show streams, TV series show season/episode selectors).
   - Web mode: opens in a new tab on [web.stremio.com](https://web.stremio.com).

## How it works

The content script needs an IMDb ID before it can add anything:

| Site | Where the IMDb ID comes from |
| --- | --- |
| Google, DuckDuckGo | The IMDb links already present in the results |
| IMDb | The page URL |
| Trakt.tv | Not available in the page — see below |

**Trakt.tv** moved to `app.trakt.tv` and was rebuilt as a client-rendered app. Its pages contain no IMDb link anywhere in the DOM, so there is nothing to read. Instead the title and year are parsed from the URL slug (`/movies/inception-2010`) and the IMDb ID is resolved through [Cinemeta](https://v3-cinemeta.strem.io), Stremio's own public metadata service. Only that title text is sent. Trakt also answers unknown slugs with a soft 404 that still renders an `<h1>`, so the heading is checked against the slug before an icon is added.

**DuckDuckGo** sends a Content-Security-Policy whose `img-src` allows `data:` but no extension scheme. The icon is therefore embedded in `content.js` as a `data:` URI rather than loaded from the extension. It is byte-identical to `icons/stremio.png`:

```bash
node -e "const fs=require('fs');const a=fs.readFileSync('icons/stremio.png').toString('base64');const b=fs.readFileSync('content.js','utf8').match(/base64,([A-Za-z0-9+\/=]+)\"/)[1];console.log(a===b)"
```

## Permissions

| Permission | Why |
| --- | --- |
| `storage` | Saves five local preferences (which sites to show the icon on, app vs. web) |
| `https://v3-cinemeta.strem.io/*` | Resolving IMDb IDs for Trakt.tv pages |

See [privacy-policy.markdown](privacy-policy.markdown) for details.

## File Structure
```
stremio-movie-search/
├── manifest.json        # Extension manifest
├── content.js           # Main script to add Stremio buttons
├── background.js        # Resolves IMDb IDs via Cinemeta for Trakt.tv
├── options.html         # Settings page
├── options.js           # Script for handling settings
└── icons/
    ├── stremdb.png      # Extension icon (96x96px)
    └── stremio.png      # Icon shown next to titles (also embedded in content.js)
```

There is **no build step**. The files in this repository are the source and are exactly what ships.

## Changelog

### 1.9
- **Fixed Trakt.tv.** The site moved to `app.trakt.tv`, which the old match patterns never covered, and its rebuilt pages no longer expose an IMDb link. Both are handled now.
- **Fixed DuckDuckGo.** The icon is embedded as a `data:` URI so it survives the site's CSP, and the result selectors no longer depend on one fixed markup shape.
- **Google country domains** (`google.com.tr`, `.de`, `.fr` and others) were never matched before, so the extension simply never loaded there.
- **Firefox for Android support.**
- Wider IMDb URL matching: tracking parameters, `m.imdb.com`, and hosts without `www`.
- Settings are read in a way that works with both callback- and promise-style storage APIs, and falls back to defaults instead of failing silently.
- Extension icon updated to the StremDB logo.
