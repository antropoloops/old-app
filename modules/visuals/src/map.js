import * as d3 from "d3";
import * as topojson from "topojson";
import {
  RATIOS,
  getScale,
  getScreenSize,
  createProjection
} from "./dimensions";

export default class Map {
  constructor(data, el) {
    this.data = data;
    this.el = d3.select(el);
    this.countries = topojson.feature(data, data.objects.countries).features;
    this.circles = {};
    this.covers = {};
    this.refLines = {};
    this.fixedAspectRatio = RATIOS.sixteenTenths;
    this.circleNumSlices = 36;
    this.coverVerP = 3;
    this.coverHorP = 3;
    this.coverCountryH = 20;
    this.coverDotR = 2;
  }

  // Use 2 different functions? one for showing circles and the other for the covers?
  show(name, set) {
    if (!this.mapContainer) return;

    const filename = set.samples[name].filename;
    const data = set.samples[name].meta;
    const track = getTrack(set.visuals.layout, name);
    const baseUrl = set.url;
    const ext = set.config.load.imageFileExt;

    const bpm = set.bpm;
    const loopend = data.loopend; // El loopend es independiente del bpm
    const dur = 60 / bpm * loopend; // Calcula la duración del loop en segundos

    const angle = d3
      .scaleLinear()
      .range([0, 360]) // working in degrees
      .domain([0, this.circleNumSlices]);

    // create arc generator
    const arc = d3.arc();

    const arcs = d3.range(this.circleNumSlices).map((d, i) => {
      return {
        startAngle: deg2rad(angle(d)), // working in degrees
        endAngle:
          i === this.circleNumSlices - 1
            ? deg2rad(angle(d + 1))
            : deg2rad(angle(d + 2)),
        innerRadius: 0,
        outerRadius: 20
      };
    });
    const outerArcs = d3.range(this.circleNumSlices).map((d, i) => {
      return {
        startAngle: deg2rad(angle(d)), // working in degrees
        endAngle:
          i === this.circleNumSlices - 1
            ? deg2rad(angle(d + 1))
            : deg2rad(angle(d + 2)),
        innerRadius: 0,
        outerRadius: 30
      };
    });

    // Draw circles
    const [cx, cy] = this.projection(data.lnglat);
    const circlesGroup = this.circlesContainer
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
      .attr("dur", dur + "s")
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
        return 0.3 / this.circleNumSlices * i;
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
        return 1 / this.circleNumSlices * i;
      });

    this.circles[name] = circlesGroup;

    // Draw covers
    const cover = this.coversContainer.append("g");
    const { width } = getScreenSize(this.fixedAspectRatio);
    const coverSide = width / 8;

    cover
      .append("svg:image")
      .attr("width", coverSide)
      .attr("height", coverSide)
      .attr("x", track * coverSide)
      .attr("y", 0)
      .style("stroke", "white")
      .attr("xlink:href", baseUrl + filename + ext);

    // Draw country rectangle
    cover
      .append("rect")
      .attr("width", coverSide)
      .attr("height", this.coverCountryH)
      .attr("x", track * coverSide)
      .attr("y", coverSide + this.coverVerP)
      .style("fill", "orange");

    // Draw country text
    cover
      .append("text")
      .attr("x", track * coverSide + this.coverHorP)
      .attr("y", coverSide + this.coverVerP + this.coverCountryH / 2)
      .attr("dy", "0.35em")
      .style("font-size", 11 + "px")
      .text(data.country);

    // Draw date point
    cover
      .append("circle")
      .attr("cx", track * coverSide + this.coverHorP + this.coverDotR)
      .attr("cy", coverSide + this.coverVerP + this.coverCountryH * 2)
      .attr("r", this.coverDotR)
      .style("fill", "orange");

    // Draw date text
    cover
      .append("text")
      .attr("x", track * coverSide + this.coverHorP)
      .attr("y", coverSide + this.coverVerP + this.coverCountryH * 1.5)
      .attr("dy", "0.35em")
      .style("font-size", 11 + "px")
      .style("font-weight", "bold")
      .style("fill", "orange")
      .text(data.year);

    this.covers[name] = cover;

    // Draw refLines
    const x1 = track * coverSide + this.coverHorP + this.coverDotR;
    const y1 = 0;
    const x2 = cx;
    const y2 = cy;
    const h = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const a = h / 10;
    const alfa = Math.acos((y2 - y1) / h);
    const curveCoords = [
      {
        x: x1,
        y: y1
      },
      {
        x: x1 + (x2 - x1) / 2 + a * Math.cos(Math.PI - alfa),
        y: y1 + (y2 - y1) / 2 + a * Math.sin(Math.PI - alfa)
      },
      { x: x2, y: y2 }
    ];

    const line = d3
      .line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveBasis);

    const refLine = this.refLinesContainer
      .append("path")
      .datum(curveCoords)
      .attr("d", line)
      .style("stroke", "orange")
      .style("fill", "none")
      .style("stroke-width", 1);

    this.refLines[name] = refLine;
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

    const refLine = this.refLines[name];
    if (refLine) {
      refLine.remove();
      this.refLines[name] = null;
    }
  }

  clear() {
    this.el.selectAll("*").remove();
  }

  render() {
    const { width, height } = getScreenSize(this.fixedAspectRatio);
    const scale = getScale(this.fixedAspectRatio);
    const coversHeight = width / 8 + this.coverVerP + this.coverCountryH * 2;

    this.clear();

    const svg = this.el
      .append("svg")
      .attr("class", "svgMap")
      .attr("width", width)
      .attr("height", height);

    this.projection = createProjection(width, height - coversHeight, scale);
    const path = d3.geoPath().projection(this.projection);

    this.mapContainer = svg
      .append("g")
      .attr("id", "map")
      .attr("transform", `translate(0, ${coversHeight})`);
    this.coversContainer = svg.append("g").attr("id", "covers");
    this.refLinesContainer = svg
      .append("g")
      .attr("id", "refLines")
      .attr("transform", `translate(0, ${coversHeight})`);
    this.circlesContainer = svg
      .append("g")
      .attr("id", "circles")
      .attr("transform", `translate(0, ${coversHeight})`);

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
