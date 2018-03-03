import "./index.css";
import renderMap from "./visuals/render-map";

const loadJson = path => fetch(path).then(response => response.json());

loadJson("antropoloops.set.json").then(set => {
  const el = document.body;
  loadJson(set.background.geoData).then(geoData => renderMap(el, geoData, set));
});
