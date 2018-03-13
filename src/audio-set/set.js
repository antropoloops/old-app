import Events from "nanobus";

export { AudioSetManager } from "./manager";

export default class AudioSet {
  constructor(data) {
    this.mounted = false;
    this.data = data;
    this.events = Events();
  }

  on(event, cb) {
    this.events.on(event, cb);
  }

  emit(...args) {
    if (this.mounted) {
      this.events.emit.apply(this.events, args);
    }
  }

  mount() {
    if (!this.mounted) {
      this.mounted = true;
      this.events.emit("mount", this);
    }
  }

  unmount() {
    if (this.mounted) {
      this.mounted = false;
      this.events.emit("unmount", this);
    }
  }
}
