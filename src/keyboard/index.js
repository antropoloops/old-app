export default function init(set, events) {
  const keyboard = set.keyboard;

  console.log("Available keys", Object.keys(keyboard).join(" "));

  const pressedKeys = {};

  window.onkeydown = function(e) {
    const key = e.key;
    const trigger = keyboard[key];
    if (trigger && !pressedKeys[key]) {
      events.emit("start", trigger.sample);
      pressedKeys[key] = true;
    }
  };

  window.onkeyup = function(e) {
    const key = e.key;
    if (key && pressedKeys[key]) {
      pressedKeys[key] = false;
      events.emit("stop", keyboard[key].sample);
    }
  };
}
