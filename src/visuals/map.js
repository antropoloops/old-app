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
    if (!this.mapContainer) return;

    const filename = set.samples[name].filename;
    const data = set.samples[name].meta;
    const layout = set.visuals.layout;
    const track = getTrack(layout, name);
    const baseUrl = set.url;
    const ext = set.config.load.imageFileExt;

    const numSlices = 36;
    const angle = d3
      .scaleLinear()
      .range([0, 360]) // working in degrees
      .domain([0, numSlices]);

    // create arc generator
    const arc = d3.arc();
    const arcs = d3.range(numSlices).map((d, i) => {
      return {
        startAngle: deg2rad(angle(d)), // working in degrees
        endAngle:
          i === numSlices - 1 ? deg2rad(angle(d + 1)) : deg2rad(angle(d + 2)),
        innerRadius: 0,
        outerRadius: 20
      };
    });

    const outerArcs = d3.range(numSlices).map((d, i) => {
      return {
        startAngle: deg2rad(angle(d)), // working in degrees
        endAngle:
          i === numSlices - 1 ? deg2rad(angle(d + 1)) : deg2rad(angle(d + 2)),
        innerRadius: 0,
        outerRadius: 30
      };
    });

    const [cx, cy] = this.projection(data.lnglat);
    const circlesGroup = this.mapContainer
      .append("g")
      .attr("transform", `translate(${cx}, ${cy})`);

    // Sin empaquetar todo en este segundo grupo no gira en su sitio
    const circle = circlesGroup.append("g");

    circle
      .append("animateTransform")
      .attr("attributeType", "xml")
      .attr("attributeName", "transform")
      .attr("type", "rotate")
      .attr("from", "0 0 0 ")
      .attr("to", "360 0 0 ")
      .attr("dur", "4s")
      .attr("repeatCount", "indefinite");

    circle
      .selectAll(".outerArcs")
      .data(outerArcs)
      .enter()
      .append("path")
      .attr("class", "outerArcs")
      .attr("d", arc)
      .style("fill", "orange")
      .style("opacity", (d, i) => {
        return 0.3 / numSlices * i;
      });

    circle
      .selectAll(".arcs")
      .data(arcs)
      .enter()
      .append("path")
      .attr("class", "arcs")
      .attr("d", arc)
      .style("fill", "orange")
      .style("opacity", (d, i) => {
        return 1 / numSlices * i;
      });

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

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}
