import Map from "./map";

export default function init(set, el) {
  fetch(set.data.visuals.geoMapUrl)
    .then(response => response.json())
    .then(data => createMap(set, data, el));
}

function createMap(set, geodata, el) {
  const { data } = set;
  const map = new Map(data, geodata, el);

  window.addEventListener("resize", () => {
    console.log("resize!");
    map.render();
  });

  set.on("mounted", () => {
    map.render();
  });
  if (set.mounted) map.render();

  set.on("unmount", () => {
    map.clear();
  });

  set.on("/audio/start", name => {
    const clip = data.clips[name];
    if (clip) {
      map.show(name);
    }
  });

  set.on("/audio/stop", name => {
    map.hide(name);
  });
}
