export default function init(events, set) {
  const triggers = set.triggers;

  const keys = Object.keys(triggers).reduce((keys, name) => {
    const trigger = triggers[name];
    if (trigger.keyboard) keys[trigger.keyboard] = name;
    return keys;
  }, {});

  console.log("keys", keys);

  window.onkeypress = function(e) {
    const name = keys[e.key.toUpperCase()];
    if (name) {
      events.emit("start", name);
    }
  };
}
