const DEFAULT_SETTINGS = {
  mode: "on",
  theme: "charcoal",
  invertPage: true,
  brightness: 100,
  contrast: 95
};

const statusPill = document.getElementById("status-pill");
const modeButtons = document.querySelectorAll("[data-mode]");
const themeButtons = document.querySelectorAll("[data-theme]");
const invertPageInput = document.getElementById("invert-page");
const pageTuning = document.getElementById("page-tuning");
const brightnessInput = document.getElementById("brightness");
const brightnessVal = document.getElementById("brightness-val");
const contrastInput = document.getElementById("contrast");
const contrastVal = document.getElementById("contrast-val");
const resetBtn = document.getElementById("reset-btn");

function render(settings) {
  modeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === settings.mode);
  });

  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === settings.theme);
  });

  invertPageInput.checked = Boolean(settings.invertPage);
  pageTuning.classList.toggle("disabled", !settings.invertPage);

  brightnessInput.value = settings.brightness;
  brightnessVal.textContent = `${settings.brightness}%`;

  contrastInput.value = settings.contrast;
  contrastVal.textContent = `${settings.contrast}%`;

  const isOff = settings.mode === "off";
  statusPill.classList.toggle("is-off", isOff);
  if (settings.mode === "on") {
    statusPill.textContent = "Active";
  } else if (settings.mode === "auto") {
    statusPill.textContent = "System";
  } else {
    statusPill.textContent = "Off";
  }
}

function updateSettings(partial) {
  chrome.storage.sync.set(partial);
}

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateSettings({ mode: btn.dataset.mode });
  });
});

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateSettings({ theme: btn.dataset.theme });
  });
});

invertPageInput.addEventListener("change", () => {
  updateSettings({ invertPage: invertPageInput.checked });
});

brightnessInput.addEventListener("input", () => {
  const val = Number(brightnessInput.value);
  brightnessVal.textContent = `${val}%`;
  updateSettings({ brightness: val });
});

contrastInput.addEventListener("input", () => {
  const val = Number(contrastInput.value);
  contrastVal.textContent = `${val}%`;
  updateSettings({ contrast: val });
});

resetBtn.addEventListener("click", () => {
  chrome.storage.sync.set({ ...DEFAULT_SETTINGS });
});

chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
  render({ ...DEFAULT_SETTINGS, ...stored });
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "sync") return;
  chrome.storage.sync.get(DEFAULT_SETTINGS, (stored) => {
    render({ ...DEFAULT_SETTINGS, ...stored });
  });
});
