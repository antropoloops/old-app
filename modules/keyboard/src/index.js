const control = require("./control");
const state = require("./state");

function init(set, events) {
  const keyMap = set.keyboard;
  const config = set.config.keyboard;

  const validKeys = Object.keys(keyMap);
  const types = validKeys.reduce((types, key) => {
    types[key] = keyMap[key].type || config.type;
    return types;
  }, {});
  console.log("Keyboard:", validKeys.join(" "));

  const keyboard = control(state(), events);

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
