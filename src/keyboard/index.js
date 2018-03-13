import Keyboard from "./keyboard";

export default function init(set) {
  const { data, events } = set;
  const keyboard = new Keyboard(data.keyboard, data.config.keyboard, events);

  console.log("Available keys", keyboard.validKeys().join(" "));

  window.onkeydown = function(e) {
    keyboard.keyDown(e.key);
  };

  window.onkeyup = function(e) {
    keyboard.keyUp(e.key);
  };
}
