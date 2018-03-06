import Events from "nanobus";
import keyboard from "./keyboard";
import audio from "./audio";
import geomap from "./geomap";
import selector from "./selector";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const DEBUG = false;
const events = new Events();

if (DEBUG) {
  events.on("*", (...args) => {
    console.log("event", args);
  });
}

function loadSet(url) {
  return fetch(url).then(response => response.json());
}

const visuals = document.getElementById("visuals");

function init(set) {
  audio(set, events);
  keyboard(set, events);
  geomap(set, events, visuals);
  selector(set, events);
}

loadSet("continentes.audioset.json").then(init);

registerServiceWorker();
