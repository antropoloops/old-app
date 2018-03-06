import Map from "./map";

export default function init(set, events, el) {
  fetch(set.geomap.dataUrl)
    .then(response => response.json())
    .then(data => createMap(set, events, data, el));
}

function createMap(set, events, data, el) {
  const map = new Map(data, el);
  map.render();

  window.addEventListener("resize", () => {
    console.log("resize!");
    map.render();
  });

  events.on("start", name => {
    const sample = set.samples[name];
    if (sample) {
      map.show(name, set);
    }
  });

  events.on("stop", name => {
    map.hide(name);
  });
}
