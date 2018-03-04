import Keyboard from "./keyboard";

export default function init(set, events) {
  const keyboard = new Keyboard(set.keyboard, set.config.keyboard, events);
  console.log("Available keys", keyboard.validKeys().join(" "));

  window.onkeydown = function(e) {
    keyboard.keyDown(e.key);
  };

  window.onkeyup = function(e) {
    keyboard.keyUp(e.key);
  };
}
