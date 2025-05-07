# Stremio Movie Search (Firefox)

A Firefox extension that enhances your Google search experience by adding a Stremio button next to IMDb links, allowing you to open movies and TV series in Stremio (app or web) with a single click.

![320105](https://github.com/user-attachments/assets/24584117-6185-4d01-a0df-5a7fdc549815)

## Overview

Stremio Movie Search seamlessly integrates with Google search results, adding a Stremio icon next to IMDb links for movies and TV series. Click the icon to launch either the Stremio app or the Stremio web app (user-configurable) to stream content directly. The extension supports dynamic search results and works instantly, even from address bar searches. Users can toggle between app and web modes via settings.

## Features
- Adds a Stremio button to IMDb links in Google search results.
- Supports both movies and TV series with accurate deep links.
- User-configurable: Choose between Stremio app or web (opens in a new tab).
- First-time prompt to select app or web, with option to change later in settings.
- Lightweight and fast, with minimal permissions.
- Works on dynamic search results and address bar searches.

## Installation

### From Firefox Add-ons Marketplace
1. Visit the [Stremio Movie Search page](https://addons.mozilla.org/en-US/firefox/addon/stremio-movie-search/) on the Firefox Add-ons Marketplace.
2. Click "Add to Firefox" and follow the prompts to install.
3. Optionally, ensure the Stremio app is installed on your device for app mode.

### Local Testing (Developers)
1. Clone this repository:
   ```
   git clone https://github.com/erolcanulutas/Stremio-Movie-Search---Firefox.git
   ```
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
3. Click "Load Temporary Add-on" and select the `manifest.json` file from the cloned directory.
4. The extension will load temporarily (until Firefox restarts) for testing.

### Requirements
- Firefox browser (latest version recommended).
- Stremio app installed for app mode (available at [stremio.com](https://www.stremio.com)), or use web mode without the app.

## Usage
1. Search for a movie or TV series on [google.com](https://www.google.com) (e.g., "Breaking Bad TV Series").
2. Locate an IMDb link in the search results (e.g., `https://www.imdb.com/title/tt0903747/`).
3. On first use, a prompt will ask if you want to use the Stremio app or web (changeable in settings).
4. Click the Stremio icon next to the IMDb link:
   - App mode: Opens in the Stremio app (movies show streams, TV series show season/episode selectors).
   - Web mode: Opens in a new tab on [web.stremio.com](https://web.stremio.com).
5. Enjoy streaming directly from your search results!

### File Structure
```
stremio-movie-search-firefox/
├── manifest.json        # Extension manifest
├── content.js           # Main script to add Stremio buttons
├── background.js        # Background script (placeholder)
├── options.html         # Settings page for app/web toggle
├── options.js           # Script for handling settings
└── icons/
    └── stremio.png      # Stremio icon (96x96px)
```
