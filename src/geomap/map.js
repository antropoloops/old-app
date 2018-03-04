import * as d3 from "d3";
import * as d3geo from "d3-geo-projection";
import * as topojson from "topojson";

function createProjection(width, height) {
  return d3geo
    .geoRobinson()
    .scale(200)
    .translate([width / 2, height / 2]);
}

export default class Map {
  constructor(data, el) {
    this.data = data;
    this.el = d3.select(el);
    this.countries = topojson.feature(data, data.objects.countries).features;
    this.circles = {};
  }

  show(name, data) {
    if (!this.container) return;
    const [cx, cy] = this.projection(data.lnglat);
    const circle = this.container
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", 10)
      .style("fill", "red");
    this.circles[name] = circle;
  }

  hide(name) {
    const circle = this.circles[name];
    if (circle) {
      circle.remove();
      this.circles[name] = null;
    }
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // remove all elements
    this.el.selectAll("*").remove();

    const svg = this.el
      .append("svg")
      .attr("class", "svgMap")
      .attr("width", width)
      .attr("height", height);
    this.container = svg.append("g");

    this.projection = createProjection(width, height);
    const path = d3.geoPath().projection(this.projection);

    this.container
      .selectAll(".countries")
      .data(this.countries)
      .enter()
      .append("path")
      .attr("class", "countries")
      .attr("d", path)
      .style("stroke", "#2c2c2c")
      .style("stroke-width", 0.5)
      .style("fill", "#888888");
  }
}
