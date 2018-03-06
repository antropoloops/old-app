import * as screen from "screenfull";

export function init() {
  if (screen.enabled) {
    screen.on("change", () => setAppVisible(screen.isFullscreen));
    screen.on("error", () => setAppVisible(true));
  }
  return screen.enabled;
}

export function setAppVisible(isVisible) {
  const app = document.getElementById("app");
  if (isVisible) {
    app.style.display = "none";
  } else {
    app.style.display = "block";
  }
}

export function openFullScreen() {
  if (screen.enabled) {
    setAppVisible(false);
    screen.request();
  }
}
