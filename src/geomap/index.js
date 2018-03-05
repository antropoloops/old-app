import Map from "./map";
// import addFullScreen from "./full-screen.js";

export default function init(set, events, el) {
  fetch(set.geomap.dataUrl)
    .then(response => response.json())
    .then(data => createMap(set, events, data, el));
}

function createMap(set, events, data, el) {
  const map = new Map(data, el);
  map.render();

  // addFullScreen();

  window.addEventListener("resize", () => {
    console.log("resize!");
    map.render();
  });

  const getTrack = (layout, name) => {
    let track;
    layout.forEach(row => {
      if (row.indexOf(name) !== -1) track = row.indexOf(name);
    });
    return track;
  };

  events.on("start", name => {
    const sample = set.samples[name];
    const layout = set.pads.layout;
    const track = getTrack(layout, name);

    if (sample) {
      map.show(name, sample.meta, track);
    }
  });

  events.on("stop", name => {
    map.hide(name);
  });
}
