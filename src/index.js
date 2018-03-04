import "./index.css";
import Events from "nanobus";
import keyboard from "./keyboard";
import audio from "./audio";
import geomap from "./geomap";

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

function init(set) {
  audio(set, events);
  keyboard(set, events);
  geomap(set, events, document.body);
}

loadSet("continentes.audioset.json").then(init);
