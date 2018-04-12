const control = require("./control");
const state = require("./state");

function init(set, events) {
  if (!set.keyboard) return null;
  const keyMap = set.keyboard.keyMap;
  const config = set.keyboard.defaults;

  const validKeys = Object.keys(keyMap);
  const types = validKeys.reduce(function(types, key) {
    types[key] = keyMap[key].type || config.type;
    return types;
  }, {});
  console.log("Keyboard:", validKeys.join(" "));

  const emit = events.emit.bind(events);
  const keyboard = control(state(), emit);

  window.onkeydown = function(e) {
    const key = e.key;
    const trigger = keyMap[key];
    const type = types[key];
    keyboard.press(key, trigger, type);
  };

  window.onkeyup = function(e) {
    const key = e.key;
    const trigger = keyMap[key];
    const type = types[key];
    keyboard.release(key, trigger, type);
  };
}

module.exports = init;
