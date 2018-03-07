import * as d3 from "d3";
import * as topojson from "topojson";
import {
  RATIOS,
  getScale,
  getWidthHeight,
  createProjection
} from "./dimensions";

export default class Map {
  constructor(data, el) {
    this.data = data;
    this.el = d3.select(el);
    this.countries = topojson.feature(data, data.objects.countries).features;
    this.circles = {};
    this.covers = {};
    this.fixedAspectRatio = RATIOS.sixteenTenths;
  }

  // Use 2 different functions? one for showing circles and the other for the covers?
  show(name, set) {
    const filename = set.samples[name].filename;
    const data = set.samples[name].meta;
    const layout = set.pads.layout;
    const track = getTrack(layout, name);
    const baseUrl = set.url;
    const ext = set.config.load.imageFileExt;

    if (!this.mapContainer) return;

    // Draw circles
    const [cx, cy] = this.projection(data.lnglat);
    const circle = this.mapContainer
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", 10)
      .style("fill", "red");
    this.circles[name] = circle;

    const { width } = getWidthHeight(this.fixedAspectRatio);
    const coverSide = width / 8;

    // Draw covers
    const cover = this.coversContainer
      .append("svg:image")
      .attr("width", coverSide)
      .attr("height", coverSide)
      .attr("x", track * coverSide)
      .attr("y", 0)
      .style("stroke", "white")
      .attr("xlink:href", baseUrl + filename + ext);
    this.covers[name] = cover;
  }

  hide(name) {
    const circle = this.circles[name];
    if (circle) {
      circle.remove();
      this.circles[name] = null;
    }

    const cover = this.covers[name];
    if (cover) {
      cover.remove();
      this.covers[name] = null;
    }
  }

  render() {
    const { width, height } = getWidthHeight(this.fixedAspectRatio);
    const scale = getScale(this.fixedAspectRatio);
    const coverSide = width / 8;

    // remove all elements
    this.el.selectAll("*").remove();

    const svg = this.el
      .append("svg")
      .attr("class", "svgMap")
      .attr("width", width)
      .attr("height", height);

    this.coversContainer = svg.append("g");
    this.mapContainer = svg
      .append("g")
      .attr("transform", `translate(0, ${coverSide})`);

    this.projection = createProjection(width, height - coverSide, scale);
    const path = d3.geoPath().projection(this.projection);

    // Draw map
    this.mapContainer
      .selectAll(".countries")
      .data(this.countries)
      .enter()
      .append("path")
      .attr("class", "countries")
      .attr("d", path)
      .style("stroke", "#2c2c2c")
      .style("stroke-width", 0.5)
      .style("fill", d => (d.id === "010" ? "none" : "#888888")); // 010 Antartica
  }
}

function getTrack(layout, name) {
  let track;
  layout.forEach(row => {
    if (row.indexOf(name) !== -1) track = row.indexOf(name);
  });
  return track;
}
