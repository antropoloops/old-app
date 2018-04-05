function control(state, events) {
  return { press: press, release: release };

  function press(key, trigger, type) {
    if (!trigger) return;
    // avoid repetition
    if (state.isKeyPressed(key)) return;
    state.setKeyPressed(true, key);

    console.log("press", type, key);

    switch (type) {
      // start every time it presses
      case "one-shot":
        if (state.isSample("on", trigger)) {
          events.emit("stop", trigger.sample);
        } else {
          state.setSample("on", trigger);
        }
        events.emit("start", trigger.sample);
        break;

      // toggle on/off
      case "toggle":
        if (state.isSample("on", trigger)) {
          state.setSample("off", trigger);
          events.emit("stop", trigger.sample);
        } else {
          state.setSample("on", trigger);
          events.emit("start", trigger.sample);
        }
        break;

      // play when down, stop when up
      case "gate":
        events.emit("start", trigger.sample);
        state.setSample("off", trigger);
        break;
      default:
        break;
    }
  }

  function release(key, trigger, type) {
    if (!trigger) return;
    // avoid repetition
    if (!state.isKeyPressed(key)) return;
    state.setKeyPressed(false, key);

    switch (type) {
      case "one-shot":
        break;

      case "toggle":
        break;

      case "gate":
        state.setSample("off", trigger);
        events.emit("stop", trigger.sample);
        break;
      default:
        break;
    }
  }
}

module.exports = control;
