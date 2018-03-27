export default class Keyboard {
  constructor(map, config, events) {
    this.map = map;
    this.events = events;
    this.config = config;
    this.pressedKeys = {};
    this.sampleStates = {};
  }

  validKeys() {
    return Object.keys(this.map);
  }

  getState(trigger) {
    return this.sampleStates[trigger.sample];
  }

  setState(trigger, value) {
    this.sampleStates[trigger.sample] = value;
  }

  keyDown(key) {
    // avoid repetition
    if (this.pressedKeys[key] === true) return;
    this.pressedKeys[key] = true;

    const trigger = this.map[key];
    if (!trigger) return;

    const type = trigger.type || this.config.type;
    switch (type) {
      // start every time it presses
      case "one-shot":
        if (this.getState(trigger) === "running") {
          this.events.emit("stop", trigger.sample);
        } else {
          this.setState(trigger, "running");
        }
        this.events.emit("start", trigger.sample);
        break;

      // toggle on/off
      case "toggle":
        if (this.getState(trigger) === "running") {
          this.setState(trigger, "stopped");
          this.events.emit("stop", trigger.sample);
        } else {
          this.setState(trigger, "running");
          this.events.emit("start", trigger.sample);
        }
        break;

      // play when down, stop when up
      case "gate":
        this.events.emit("start", trigger.sample);
        this.setState(trigger, "running");
        break;
      default:
        break;
    }
  }

  keyUp(key) {
    // avoid repetition
    if (this.pressedKeys[key] !== true) return;
    this.pressedKeys[key] = false;

    const trigger = this.map[key];
    if (!trigger) return;

    const type = trigger.type || this.config.type;
    switch (type) {
      case "one-shot":
        break;

      case "toggle":
        break;

      case "gate":
        this.setState(trigger, "stopped");
        this.events.emit("stop", trigger.sample);
        break;
      default:
        break;
    }
  }
}
