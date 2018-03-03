import * as d3 from "d3";
import renderMap from "./render-map";

const state = {
  circles: {}
};

export default function initVisuals(el, geoData, set, events) {
  const places = Object.keys(set.samples).reduce((places, name) => {
    const sample = set.samples[name];
    if (sample.location) places[name] = sample.location;
    return places;
  }, {});

  console.log("locations", places);

  const { container, projection } = renderMap(el, geoData, set);

  events.on("start", name => {
    const location = places[name];
    const place = set.geoLocation[location];

    if (location) {
      state.circles[name] = showCircle(container, projection, place);
    }
  });

  events.on("stop", name => {
    const circle = state.circles[name];
    state.circles[name] = null;
    // FIXME: borrar el círculo de verdad
    circle.remove();
  });
}

function showCircle(container, projection, place) {
  return container
    .append("circle")
    .attr("cx", projection(place.coord)[0])
    .attr("cy", projection(place.coord)[1])
    .attr("r", 10);
}
