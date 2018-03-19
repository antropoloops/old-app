import Events from "nanobus";
import AudioSet from "./set";

const CURRENT_CHANGED = "AudioSetManager.currentChanged";
const SET_LOADED = "AudioSetManager.setLoaded";

export default class AudioSetManager {
  constructor() {
    this.cache = {};
    this.events = Events();
    this.current = null;
  }

  loadSet(url) {
    if (this.cache[url]) return Promise.resolve(this.cache[url]);
    return fetch(url)
      .then(response => response.json())
      .then(data => new AudioSet(data))
      .then(set => {
        this.cache[url] = set;
        this.events.emit(SET_LOADED, set);
        return set;
      });
  }

  onSetLoaded(fn) {
    this.events.on(SET_LOADED, fn);
  }

  setCurrent(set) {
    if (this.current) {
      this.current.unmount();
    }
    this.current = set;
    set.mount();
    this.events.emit(CURRENT_CHANGED, this.current);
  }

  onCurrent(fn) {
    this.events.on(CURRENT_CHANGED, fn);
    if (this.current) fn(this.current);
  }
}
