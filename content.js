(() => {
  const CACHE_KEY = "__gddm_settings_cache_v1__";

  const DEFAULT_SETTINGS = {
    mode: "on", // "on" | "off" | "auto"
    theme: "charcoal", // "charcoal" | "midnight" | "oled" | "warm"
    invertPage: true,
    brightness: 100,
    contrast: 95
  };

  const THEME_INVERT_AMOUNT = {
    charcoal: 0.88,
    midnight: 0.90,
    oled: 0.96,
    warm: 0.87
  };

  const systemDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let currentSettings = loadCachedSettings();

  function loadCachedSettings() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return { ...DEFAULT_SETTINGS };
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveCachedSettings(settings) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(settings));
    } catch {
      // Ignore storage quota or privacy restrictions.
    }
  }

  function isDarkActive(settings) {
    if (settings.mode === "on") return true;
    if (settings.mode === "off") return false;
    return systemDarkQuery.matches;
  }

  function buildCanvasFilter(settings) {
    const invertAmount = THEME_INVERT_AMOUNT[settings.theme] ?? 0.88;
    const brightness = Math.min(120, Math.max(70, Number(settings.brightness) || 100)) / 100;
    const contrast = Math.min(120, Math.max(75, Number(settings.contrast) || 95)) / 100;
    const sepia = settings.theme === "warm" ? " sepia(0.14)" : "";
    return `invert(${invertAmount}) hue-rotate(180deg) brightness(${brightness}) contrast(${contrast})${sepia}`;
  }

  function applySettings(settings) {
    currentSettings = { ...DEFAULT_SETTINGS, ...settings };
    const root = document.documentElement;
    if (!root) return;

    const active = isDarkActive(currentSettings);
    const isShareDialog = window.location.pathname.includes("/drivesharing/");
    const isSheets = window.location.pathname.startsWith("/spreadsheets/");
    root.dataset.gddmActive = active && !isShareDialog ? "true" : "false";
    root.dataset.gddmShareDialog = active && isShareDialog ? "true" : "false";
    root.dataset.gddmApp = isSheets ? "sheets" : "docs";
    root.dataset.gddmTheme = currentSettings.theme;
    root.dataset.gddmInvertPage = currentSettings.invertPage ? "true" : "false";

    if (active && currentSettings.invertPage) {
      root.style.setProperty("--gddm-canvas-filter", buildCanvasFilter(currentSettings));
    } else {
      root.style.removeProperty("--gddm-canvas-filter");
    }
  }

  // Apply synchronously at document_start from local cache to avoid white flash.
  applySettings(currentSettings);

  // Sync authoritative settings from chrome.storage.sync.
  if (typeof chrome !== "undefined" && chrome.storage?.sync) {
    chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
      if (chrome.runtime.lastError) return;
      const merged = { ...DEFAULT_SETTINGS, ...stored };
      saveCachedSettings(merged);
      applySettings(merged);
    });

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== "sync") return;
      const updated = { ...currentSettings };
      for (const [key, change] of Object.entries(changes)) {
        updated[key] = change.newValue;
      }
      saveCachedSettings(updated);
      applySettings(updated);
    });
  }

  // React to OS theme changes when in "auto" mode.
  systemDarkQuery.addEventListener("change", () => {
    if (currentSettings.mode === "auto") {
      applySettings(currentSettings);
    }
  });
})();
