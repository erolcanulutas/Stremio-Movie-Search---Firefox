# Privacy Policy for Stremio Movie Search

**Last Updated: August 16, 2026**

This Privacy Policy describes how the Stremio Movie Search extension ("Extension"), developed by Erol Can Ulutas, handles user data. The Extension adds a Stremio button next to movie and TV show titles on Google, DuckDuckGo, IMDb and Trakt.tv, with options to open content in the Stremio app or web player.

## Data Collection

The Extension does not collect, store, or transmit any personal or sensitive user data, including but not limited to names, email addresses, location data, browsing history, or user activity. No analytics, tracking or advertising services are integrated, and no account is required.

## Local Storage

The Extension uses the browser's local storage to save five preferences: whether to open titles in the Stremio app or the web player, and whether the button is shown on Google, DuckDuckGo, IMDb and Trakt.tv respectively. These are stored locally on the user's device and are never accessed or shared by the developer.

## Network Requests

Trakt.tv no longer publishes IMDb IDs on its pages. When a Trakt.tv title page is open and no IMDb ID can be found in the page, the Extension sends the title and year — taken from the page's own URL, for example `/movies/inception-2010` — to Cinemeta (`https://v3-cinemeta.strem.io`), Stremio's public metadata service, in order to look up the matching IMDb ID.

This is the only outbound request the Extension makes. It contains nothing but that title text: no identifiers, no cookies, no browsing history, and no information about the user. It happens only on Trakt.tv pages, and only when the Trakt.tv toggle is enabled in settings.

## Data Sharing

No user data is sold, shared, or transferred to third parties for any purpose, including advertising or credit evaluation.

## Security

All preferences are held in local storage. The only network request is the metadata lookup described above, made over HTTPS.

## Changes to This Policy

The developer may update this Privacy Policy as needed. Changes will be posted on this page with an updated "Last Updated" date. Users are encouraged to review this policy periodically.

## Contact

For questions or concerns, please contact the developer at erolcanulutas@gmail.com or through the GitHub repository: https://github.com/erolcanulutas/Stremio-Movie-Search---Firefox.
