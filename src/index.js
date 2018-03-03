import "./index.css";
import renderMap from "./visuals/render-map";

const loadJson = path => fetch(path).then(response => response.json());

loadJson("antropoloops.set.json").then(set => {
  loadJson(set.background.geoDataUrl).then(geoData => renderMap(geoData, set));
});
