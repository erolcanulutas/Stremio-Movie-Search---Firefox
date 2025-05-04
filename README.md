# Stremio Movie Search

A Firefox extension that enhances your Google search experience by adding a Stremio button next to IMDb links, allowing you to open movies and TV series in Stremio with a single click.

## Overview

Stremio Movie Search seamlessly integrates with Google search results, adding a Stremio icon next to IMDb links for movies and TV series. Click the icon to launch the Stremio app and stream content directly, whether it's a blockbuster film or a multi-season series. The extension supports dynamic search results and works instantly, even from address bar searches.

## Features
- Adds a Stremio button to IMDb links in Google search results.
- Supports both movies and TV series with accurate deep links.
- Lightweight and fast, with minimal permissions.
- Works on dynamic search results and address bar searches.
- Custom icon fusing IMDb and Stremio branding for a unique look.

## Installation

### From Firefox Add-ons Marketplace
1. Visit the [Stremio Movie Search page](https://addons.mozilla.org/en-US/firefox/addon/stremio-movie-search/) on the Firefox Add-ons Marketplace.
2. Click "Add to Firefox" and follow the prompts to install.
3. Ensure the Stremio app is installed on your device.

### Local Testing (Developers)
1. Clone this repository:
   ```
   git clone https://github.com/erolcanulutas/StremioMovieSearch.git
   ```
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
3. Click "Load Temporary Add-on" and select the `manifest.json` file from the cloned directory.
4. The extension will load temporarily (until Firefox restarts) for testing.

### Requirements
- Firefox browser (latest version recommended).
- Stremio app installed (available at [stremio.com](https://www.stremio.com)).

## Usage
1. Search for a movie or TV series on [google.com](https://www.google.com) (e.g., "Breaking Bad TV Series").
2. Locate an IMDb link in the search results (e.g., `https://www.imdb.com/title/tt0903747/`).
3. Click the Stremio icon next to the IMDb link to open the content in the Stremio app.
   - For movies, it will show available streams.
   - For TV series, it will display season and episode selectors (if supported by Stremio add-ons).
4. Enjoy streaming directly from your search results!

## Development

### File Structure
```
stremio-movie-search/
├── manifest.json        # Extension manifest
├── content.js          # Main script to add Stremio buttons
├── background.js       # Background script (currently unused)
└── icons/
    └── stremio.png     # Custom IMDb-Stremio fused icon (96x96px)
```

### Building
1. Ensure all files are in the root directory as shown above.
2. Edit `manifest.json` and replace the placeholder UUID under `browser_specific_settings.gecko.id` with your own unique ID (e.g., `{your-unique-uuid}`) obtained from the Firefox Add-ons Marketplace after your first submission.
3. Create a ZIP file:
   ```
   zip -r stremio-movie-search-v1.4.zip manifest.json content.js background.js icons/
   ```
4. Submit the ZIP to the Firefox Add-ons Marketplace via the Developer Hub.
