import Events from "nanobus";
import AudioSet from "./set";

const CURRENT_CHANGED = "AudioSetManager.currentChanged";
const SET_LOADED = "AudioSetManager.setLoaded";

export default class AudioSetManager {
  constructor() {
    this.cache = {};
    this.events = Events();
    this.current = null;
    this.setList = null;
  }

  loadSetList() {
    if (this.setList) return Promise.resolve(this.setList);
    console.log("fetch set list");
    // http://localhost:3333/data/audisets/index.json
    return fetch("sets/audioset.index.json")
      .then(response => response.json())
      .then(list => {
        this.setList = list;
        return list;
      });
  }

  loadSet(url) {
    console.log("loading set", url);
    if (this.cache[url]) return Promise.resolve(this.cache[url]);
    return fetch("sets/" + url)
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
