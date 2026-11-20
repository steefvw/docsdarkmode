const DEFAULT_SETTINGS = {
  mode: "on", // "on" | "off" | "auto"
  theme: "charcoal", // "charcoal" | "midnight" | "oled" | "warm"
  invertPage: true,
  brightness: 100, // 70 - 120
  contrast: 95 // 75 - 120
};

async function getSettings() {
  const stored = await chrome.storage.sync.get(DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...stored };
}

function updateBadge(settings) {
  if (settings.mode === "off") {
    chrome.action.setBadgeText({ text: "OFF" });
    chrome.action.setBadgeBackgroundColor({ color: "#52525b" });
  } else if (settings.mode === "auto") {
    chrome.action.setBadgeText({ text: "AUTO" });
    chrome.action.setBadgeBackgroundColor({ color: "#3b82f6" });
  } else {
    chrome.action.setBadgeText({ text: "" });
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  const current = await chrome.storage.sync.get(null);
  const merged = { ...DEFAULT_SETTINGS, ...current };
  await chrome.storage.sync.set(merged);
  updateBadge(merged);
});

chrome.runtime.onStartup.addListener(async () => {
  const settings = await getSettings();
  updateBadge(settings);
});

chrome.storage.onChanged.addListener(async (changes, areaName) => {
  if (areaName !== "sync") return;
  const settings = await getSettings();
  updateBadge(settings);
});

chrome.commands.onCommand.addListener(async (command) => {
  const settings = await getSettings();

  if (command === "toggle-dark-mode") {
    const nextMode = settings.mode === "off" ? "on" : "off";
    await chrome.storage.sync.set({ mode: nextMode });
  } else if (command === "toggle-page-invert") {
    await chrome.storage.sync.set({ invertPage: !settings.invertPage });
  }
});
