import "./index.css";
import visuals from "./visuals";
import Events from "tiny-emitter";
import keyboard from "./keyboard";

const events = new Events();

events.on("start", name => {
  console.log("start", name);
});

events.on("stop", name => {
  console.log("start", name);
});

const loadJson = path => fetch(path).then(response => response.json());

loadJson("antropoloops.set.json").then(set => {
  keyboard(events, set);
  const el = document.body;
  loadJson(set.background.geoDataUrl).then(geoData =>
    visuals(el, geoData, set, events)
  );
});
