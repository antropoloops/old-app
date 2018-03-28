import * as d3 from "d3";
import * as chroma from "chroma-js";
import * as topojson from "topojson";
import {
  RATIOS,
  getScale,
  getScreenSize,
  createProjection
} from "./dimensions";

import { createCircle } from "./circle";
import { createAlbum, getAlbumHeight } from "./album";
import { createRefLine } from "./ref-line";

function getAlbumInfo(set, name) {
  const sample = set.samples[name].meta;
  const trackNumber = getTrack(set.visuals.layout, name);
  const filename = set.samples[name].filename;
  const ext = set.config.load.imageFileExt;

  return {
    trackNumber,
    lnglat: sample.lnglat,
    duration: 60 / set.bpm * sample.loopend,
    loopend: sample.loopend,
    imageUrl: set.url + filename + ext,
    year: sample.year,
    country: sample.country
  };
}

export default class Map {
  constructor(set, data, el) {
    this.set = set;
    this.data = data;
    this.el = d3.select(el);
    this.countries = topojson.feature(data, data.objects.countries).features;
    this.circles = {};
    this.covers = {};
    this.refLines = {};
    this.fixedAspectRatio = RATIOS.sixteenTenths;
  }

  // Use 2 different functions? one for showing circles and the other for the covers?
  show(name) {
    if (!this.mapContainer) return;

    const info = getAlbumInfo(this.set, name);
    const { width } = getScreenSize(this.fixedAspectRatio);
    const [cx, cy] = this.projection(info.lnglat);

    const circle = createCircle(this.circlesContainer, cx, cy, info.duration);
    this.circles[name] = circle;

    const album = createAlbum(this.coversContainer, width, info);
    this.covers[name] = album;

    const refLine = createRefLine(
      this.refLinesContainer,
      width,
      cx,
      cy,
      info.trackNumber
    );
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
    const coversHeight = getAlbumHeight(width);

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
  let trackNumber;
  layout.forEach(row => {
    if (row.indexOf(name) !== -1) trackNumber = row.indexOf(name);
  });
  return trackNumber;
}

function getColor(trackNumber) {
  console.log("chroma", chroma("pink"));
}
getColor(1);
