import * as d3 from "d3";
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
import { createWave } from "./wave";

function getAlbumInfo(set, name) {
  const filename = set.samples[name].filename;
  const meta = set.samples[name].meta;
  const parameters = set.samples[name].parameters;
  const ext = set.config.load.imageFileExt;

  return {
    lnglat: meta.lnglat,
    year: meta.year,
    country: meta.country,
    trackNumber: parameters.track,
    loopend: parameters.loopend,
    duration: 60 / set.bpm * parameters.loopend,
    imageUrl: set.url + filename + ext
  };
}

export default class Map {
  constructor(set, geodata, el) {
    this.set = set;
    this.geodata = geodata;
    this.el = d3.select(el);
    this.countries = topojson.feature(
      geodata,
      geodata.objects.countries
    ).features;
    this.circles = {};
    this.covers = {};
    this.refLines = {};
    this.waves = {};
    this.fixedAspectRatio = RATIOS.sixteenTenths;
  }

  // Use 2 different functions? one for showing circles and the other for the covers?
  show(name) {
    if (!this.mapContainer) return;

    const info = getAlbumInfo(this.set, name);
    const { screenWidth } = getScreenSize(this.fixedAspectRatio);
    const [cx, cy] = this.projection(info.lnglat);

    const circle = createCircle(
      this.circlesContainer,
      cx,
      cy,
      info.duration,
      info.trackNumber
    );
    this.circles[name] = circle;

    const album = createAlbum(this.coversContainer, screenWidth, info);
    this.covers[name] = album;

    const refLine = createRefLine(
      this.refLinesContainer,
      screenWidth,
      cx,
      cy,
      info.trackNumber
    );
    this.refLines[name] = refLine;

    const wave = createWave(this.wavesContainer, cx, cy, info.trackNumber);
    this.waves[name] = wave;
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

    const wave = this.waves[name];
    if (wave) {
      wave.remove();
      this.waves[name] = null;
    }
  }

  clear() {
    this.el.selectAll("*").remove();
  }

  render() {
    const { screenWidth, screenHeight } = getScreenSize(this.fixedAspectRatio);
    const scale = getScale(this.fixedAspectRatio);
    const coversHeight = getAlbumHeight(screenWidth);
    this.clear();

    const svg = this.el
      .append("svg")
      .attr("class", "svgMap")
      .attr("width", screenWidth)
      .attr("height", screenHeight);

    this.projection = createProjection(
      screenWidth,
      screenHeight - coversHeight,
      scale
    );
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
    this.wavesContainer = svg
      .append("g")
      .attr("id", "waves")
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
