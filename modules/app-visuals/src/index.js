import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import initAudio from "@atpls/audio-playback";
import initKeyboard from "@atpls/keyboard";
import { initConnection, loadAudioSet, getEvents } from "@atpls/audioset";
import initVisuals from "./visuals";
import defaultSet from "@atpls/audioset/sets/lik03.audioset.json";
import App from "./App";
import "./index.css";

initConnection(window.origin).then(({ url, socket }) => {
  const hash = window.location.hash.slice(1).toLowerCase();
  const setName = hash.length ? hash : "lik03";
  const setsUrl = url + "sets/";
  loadAudioSet(setName, setsUrl, defaultSet).then(set => {
    const events = getEvents(set, socket);
    const hasKeyboard = initKeyboard(set, events);
    initVisuals(set, events, document.getElementById("visuals"));
    initAudio(set, events);

    ReactDOM.render(
      <App set={set} url={url} events={events} hasKeyboard={hasKeyboard} />,
      document.getElementById("app")
    );
  });
});

registerServiceWorker();
