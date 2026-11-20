# Google Docs Dark Mode (Chrome Extension)

A lightweight Manifest V3 Chrome extension that brings customizable dark mode to Google Docs—including both the editor chrome and the document canvas.

## Features

- **4 Dark Themes:** Charcoal, Midnight, OLED Black, and Warm.
- **Dark / Light Page Toggle:** Invert the Google Docs document canvas for comfortable night reading, or keep the page white while using a dark UI when checking print colors or images.
- **Page Brightness & Contrast Sliders:** Fine-tune canvas legibility.
- **System Theme Sync (`Auto`):** Automatically follows your OS dark/light mode preference.
- **Zero Flash on Load:** Applies your cached theme at `document_start`.
- **Keyboard Shortcuts:**
  - `Alt+Shift+D` (`Option+Shift+D` on Mac): Toggle dark mode on/off
  - `Alt+Shift+P` (`Option+Shift+P` on Mac): Toggle dark page vs. light page

## Installation (Load Unpacked in Chrome)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/steefvw/docsdarkmode.git
   ```
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked** and select the cloned `docsdarkmode` folder.
5. Open or reload any Google Docs tab (`https://docs.google.com/document/...`).
