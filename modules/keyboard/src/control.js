function control(state, emit) {
  return { press: press, release: release };

  function press(key, trigger, type) {
    if (!trigger) return;
    // avoid repetition
    if (state.isKeyPressed(key)) return;
    state.setKeyPressed(true, key);

    switch (type) {
      // start every time it presses
      case "one-shot":
        if (state.isSample("on", trigger)) {
          emit("/sample/stop", trigger.sample);
        } else {
          state.setSample("on", trigger);
        }
        emit("/sample/start", trigger.sample);
        break;

      // toggle on/off
      case "toggle":
        if (state.isSample("on", trigger)) {
          state.setSample("off", trigger);
          emit("/sample/stop", trigger.sample);
        } else {
          state.setSample("on", trigger);
          emit("/sample/start", trigger.sample);
        }
        break;

      // play when down, stop when up
      case "gate":
        emit("/sample/start", trigger.sample);
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
        emit("/sample/stop", trigger.sample);
        break;
      default:
        break;
    }
  }
}

module.exports = control;
