import { AudioSetManager } from "./audio-set";
import keyboard from "./keyboard";
import audio from "./audio";
import visuals from "@antpls/visuals";
import app from "./app";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const el = document.getElementById("visuals");

function init() {
  const manager = new AudioSetManager();

  manager.onSetLoaded(set => {
    keyboard(set);
    audio(set);
    visuals(set, el);
  });

  app(manager);
}

init();
registerServiceWorker();
