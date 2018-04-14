import Map from "./map";

export default function init(set, events, el) {
  fetch(set.visuals.geoMapUrl)
    .then(response => response.json())
    .then(data => createMap(el, set, data, events));
}

function createMap(el, set, geodata, events) {
  const map = new Map(set, geodata, el);
  map.render();

  window.addEventListener("resize", () => {
    map.render();
  });

  events.on("/audio/started", name => {
    const clip = set.clips[name];
    if (clip) {
      map.show(name);
    }
  });

  events.on("/audio/stopped", name => {
    map.hide(name);
  });
}
