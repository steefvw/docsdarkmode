# Google Docs & Sheets Dark Mode (Chrome Extension)

A lightweight Manifest V3 Chrome extension that brings customizable dark mode to **Google Docs** and **Google Sheets**—including both the editor chrome and the document/spreadsheet canvas.

## Features

- **4 Dark Themes:** Charcoal, Midnight, OLED Black, and Warm.
- **Dark / Light Page & Sheet Toggle:** Invert the Google Docs page or Google Sheets grid canvas for comfortable night work, or keep the canvas light while using a dark UI when checking exact colors, charts, or images.
- **Canvas Brightness & Contrast Sliders:** Fine-tune readability.
- **System Theme Sync (`Auto`):** Automatically follows your OS dark/light mode preference.
- **Zero Flash on Load:** Applies your cached theme at `document_start`.
- **Keyboard Shortcuts:**
  - `Alt+Shift+D` (`Option+Shift+D` on Mac): Toggle dark mode on/off
  - `Alt+Shift+P` (`Option+Shift+P` on Mac): Toggle dark page/sheet vs. light page/sheet

## Installation (Load Unpacked in Chrome)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/steefvw/docsdarkmode.git
   ```
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked** and select the cloned `docsdarkmode` folder.
5. Open or reload any Google Docs (`https://docs.google.com/document/...`) or Google Sheets (`https://docs.google.com/spreadsheets/...`) tab.
