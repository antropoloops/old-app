import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import initAudio from "@atpls/audio";
import initKeyboard from "@atpls/keyboard";
import { initConnection, loadAudioSet, getEvents } from "@atpls/audioset";
import initVisuals from "./visuals";
import defaultSet from "@atpls/audioset/sets/continentes.audioset.json";
import App from "./App";
import "./index.css";

const log = process.env.NODE_ENV === "production" ? undefined : console.log;

initConnection(window.origin).then(({ url, socket }) => {
  const setName = window.location.hash.slice(1).toLowerCase();
  const setsUrl = url + "sets/";
  loadAudioSet(setName, setsUrl, defaultSet).then(set => {
    const events = getEvents(set, socket, log);
    const hasKeyboard = initKeyboard(set, events);
    initVisuals(set, events, document.getElementById("visuals"));
    initAudio(set, events);

    ReactDOM.render(
      <App set={set} events={events} hasKeyboard={hasKeyboard} />,
      document.getElementById("app")
    );
  });
});

registerServiceWorker();
