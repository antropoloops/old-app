import * as d3 from "d3";
import * as topojson from "topojson";
import {
  RATIOS,
  getScale,
  getScreenSize,
  createProjection
} from "./dimensions";
import { getColor } from "./color";

import { createCircle } from "./circle";
import { createAlbum, getAlbumHeight } from "./album";
import { createRefLine } from "./ref-line";
import { createWave } from "./wave";
import { createLastSampleInfo } from "./lastSampleInfo";

function getAlbumInfo(set, name) {
  const filename = set.samples[name].filename;
  const meta = set.samples[name].meta;
  const parameters = set.samples[name].parameters;
  const ext = set.config.load.imageFileExt;

  return {
    lnglat: meta.lnglat,
    year: meta.year,
    country: meta.country,
    title: meta.title,
    artist: meta.artist,
    album: meta.album,
    trackNumber: parameters.track,
    loopend: parameters.loopend,
    trackVolume: parameters.trackVolume,
    duration: 60 * parameters.loopend / set.bpm, // in seconds
    imageUrl: set.url + filename + ext,
    trackColor: getColor(parameters.track)
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
    this.albums = {};
    this.refLines = {};
    this.infos = {};
    this.fixedAspectRatio = RATIOS.sixteenTenths;
  }

  show(name) {
    if (!this.mapContainer) return;

    const info = getAlbumInfo(this.set, name);
    const { screenWidth, screenHeight } = getScreenSize(this.fixedAspectRatio);
    const [cx, cy] = this.projection(info.lnglat);

    const circle = createCircle(
      this.circlesContainer,
      screenWidth,
      cx,
      cy,
      info
    );
    this.circles[name] = circle;

    const album = createAlbum(this.albumsContainer, screenWidth, info);
    this.albums[name] = album;

    const refLine = createRefLine(
      this.refLinesContainer,
      screenWidth,
      cx,
      cy,
      info.trackNumber,
      info.trackColor
    );
    this.refLines[name] = refLine;

    createWave(
      this.wavesContainer,
      screenWidth,
      cx,
      cy,
      info.trackColor,
      info.trackVolume
    );

    const lastSampleInfo = createLastSampleInfo(
      this.lastSampleInfoContainer,
      screenWidth,
      screenHeight,
      info
    );
    this.infos[name] = lastSampleInfo;
  }

  hide(name) {
    const circle = this.circles[name];
    if (circle) {
      circle.remove();
      this.circles[name] = null;
    }

    const album = this.albums[name];
    if (album) {
      album.remove();
      this.albums[name] = null;
    }

    const refLine = this.refLines[name];
    if (refLine) {
      refLine.remove();
      this.refLines[name] = null;
    }

    const lastSampleInfo = this.infos[name];
    if (lastSampleInfo) {
      lastSampleInfo.remove();
      this.infos[name] = null;
    }
  }

  clear() {
    this.el.selectAll("*").remove();
  }

  render() {
    const { screenWidth, screenHeight } = getScreenSize(this.fixedAspectRatio);
    const scale = getScale(this.fixedAspectRatio);
    const albumsHeight = getAlbumHeight(screenWidth);
    this.clear();

    const svg = this.el
      .append("svg")
      .attr("class", "svgMap")
      .attr("width", screenWidth)
      .attr("height", screenHeight);
    this.mapContainer = svg
      .append("g")
      .attr("id", "map")
      .attr("transform", `translate(0, ${albumsHeight})`);
    this.albumsContainer = svg.append("g").attr("id", "albums");
    this.refLinesContainer = svg
      .append("g")
      .attr("id", "refLines")
      .attr("transform", `translate(0, ${albumsHeight})`);
    this.circlesContainer = svg
      .append("g")
      .attr("id", "circles")
      .attr("transform", `translate(0, ${albumsHeight})`);
    this.wavesContainer = svg
      .append("g")
      .attr("id", "waves")
      .attr("transform", `translate(0, ${albumsHeight})`);
    this.lastSampleInfoContainer = svg
      .append("g")
      .attr("id", "lastSampleInfo")
      .attr("transform", `translate(0, ${albumsHeight})`);

    // Draw map
    this.projection = createProjection(
      screenWidth,
      screenHeight - albumsHeight,
      scale
    );
    const path = d3.geoPath().projection(this.projection);
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
