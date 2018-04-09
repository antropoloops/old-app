import { AudioSetManager } from "./audio-set";
import keyboard from "@atpls/keyboard";
import audio from "@atpls/audio";
import visuals from "./visuals";
import app from "./app";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import io from "socket.io-client";

const el = document.getElementById("visuals");

function init() {
  const manager = new AudioSetManager();

  manager.onSetLoaded(set => {
    keyboard(set.data, set);
    audio(set.data, set);
    visuals(set, el);
    sockets(set);
  });

  app(manager);
}

function sockets({ data, events }) {
  fetch("http://localhost:3333/status")
    .then(response => response.json())
    .then(status => {
      console.log("connecting...", data);
      const url = status.address;
      const socket = io(url);
      socket.on("message", (event, name) => {
        events.emit(event, name);
      });
    });
}

init();
registerServiceWorker();
