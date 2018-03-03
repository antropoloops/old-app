import "./index.css";
import visuals from "./visuals";
import Events from "nanobus";
import keyboard from "./keyboard";
import audio from "./audio";

const events = new Events();

events.on("*", (...args) => {
  console.log("event", args);
});

const loadJson = path => fetch(path).then(response => response.json());

loadJson("antropoloops.set.json").then(set => {
  keyboard(set, events);
  audio(set, events);
  const el = document.body;
  loadJson(set.background.geoDataUrl).then(geoData =>
    visuals(el, geoData, set, events)
  );
});
