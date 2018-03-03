import * as d3 from "d3";
import * as d3geo from "d3-geo-projection";
import * as topojson from "topojson";
import "./index.css";

const loadJson = path => fetch(path).then(response => response.json());

loadJson("antropoloops.set.json").then(set => {
  loadJson(set.geolocation.data).then(geoData => displayData(geoData, set));
});

function displayData(geoData, set) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const mapDiv = d3.select("body");
  const svg = mapDiv
    .append("svg")
    .attr("class", "svgMap")
    .attr("width", width)
    .attr("height", height);
  const g = svg.append("g");

  d3.select(".svgMap").on("click", (d, i, node) => {
    const el = node[i];
    const rfs =
      el.requestFullscreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    rfs.call(el);
  });
  const projection = d3geo
    .geoRobinson()
    .scale(200)
    .translate([width / 2, height / 2]);
  const path = d3.geoPath().projection(projection);
  const countriesGeometries = topojson.feature(
    geoData,
    geoData.objects.countries
  ).features;
  const drawMap = (container, data) => {
    container
      .selectAll(".countries")
      .data(data)
      .enter()
      .append("path")
      .attr("class", "countries")
      .attr("d", path)
      .style("stroke", "#2c2c2c")
      .style("stroke-width", 0.5)
      .style("fill", "#888888");
  };
  drawMap(g, countriesGeometries);
  // window.onresize = drawMap(g, countriesGeometries)
}
