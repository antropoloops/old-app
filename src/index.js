import Events from "nanobus";
import keyboard from "./keyboard";
import audio from "./audio";
import visuals from "./visuals";
import app from "./app";
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

function init(set) {
  audio(set, events);
  keyboard(set, events);
  visuals(set, events, document.getElementById("visuals"));
  app(set, events);
}

loadSet("continentes.audioset.json").then(init);

registerServiceWorker();
