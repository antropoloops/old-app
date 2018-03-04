import * as d3 from "d3";
import * as d3geo from "d3-geo-projection";
import * as topojson from "topojson";

export default class Map {
  constructor(data, el) {
    this.data = data;
    this.el = d3.select(el);
    this.countries = topojson.feature(data, data.objects.countries).features;
    this.circles = {};
  }

  show(name, data) {
    if (!this.mapContainer) return;
    const [cx, cy] = this.projection(data.lnglat);
    const circle = this.mapContainer
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
    const wWidth = window.innerWidth;
    const wHeight = window.innerHeight;
    const realAspectRatio = wWidth / wHeight;
    const ratios = {
      sixteenNinths: 16 / 9,
      sixteenTenths: 16 / 10
    };
    const fixedAspectRatio = ratios.sixteenTenths;

    const width =
      realAspectRatio < fixedAspectRatio ? wWidth : wHeight * fixedAspectRatio;
    const height =
      realAspectRatio < fixedAspectRatio ? wWidth / fixedAspectRatio : wHeight;
    const scale =
      fixedAspectRatio === ratios.sixteenTenths ? width / 5.9 : width / 6.5;
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

    // Draw covers
    this.coversContainer
      .selectAll(".cover")
      .data([1, 1, 1, 1, 1, 1, 1, 1])
      .enter()
      .append("rect")
      .attr("class", "cover")
      .attr("width", coverSide)
      .attr("height", coverSide)
      .attr("x", (d, i) => i * coverSide)
      .attr("y", 0)
      .style("stroke", "white");

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

function createProjection(width, height, scale) {
  return d3geo
    .geoRobinson()
    .scale(scale)
    .translate([width / 2, height / 2 + height / 15])
    .rotate([-10, 0, 0]);
}
