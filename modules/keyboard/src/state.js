/**
 * We need to store if a key is pressed (to avoid repetition) and
 * the sample state (currently only "on" and "off")
 */
function state() {
  const pressedKeys = {};
  const sampleStates = {};

  return {
    setKeyPressed: function(isPressed, key) {
      pressedKeys[key] = isPressed;
    },
    isKeyPressed: function(key) {
      return pressedKeys[key] === true;
    },

    isSample: function(state, trigger) {
      return sampleStates[trigger.sample] === state;
    },
    setSample: function(state, trigger) {
      sampleStates[trigger.sample] = state;
    }
  };
}

module.exports = state;
