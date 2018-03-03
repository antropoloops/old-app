export default function init(set, events) {
  const triggers = set.triggers;

  const pressedKeys = {};

  const keys = Object.keys(triggers).reduce((keys, name) => {
    const trigger = triggers[name];
    if (trigger.keyboard) keys[trigger.keyboard] = name;
    return keys;
  }, {});

  console.log("keys", keys);

  window.onkeydown = function(e) {
    const name = keys[e.key.toUpperCase()];
    if (name && !pressedKeys[name]) {
      events.emit("start", name);
      pressedKeys[name] = true;
    }
  };

  window.onkeyup = function(e) {
    const name = keys[e.key.toUpperCase()];
    if (name) {
      pressedKeys[name] = false;
      events.emit("stop", name);
    }
  };
  return keys;
}
