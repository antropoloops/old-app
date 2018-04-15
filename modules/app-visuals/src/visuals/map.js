import * as d3 from "d3";
import * as topojson from "topojson";
import hsvToRgb from "hsv-rgb";

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
import { createLastSampleInfo } from "./lastSampleInfo";
import { createImprint } from "./imprint";

const HSV = /^hsv\((.*)\)$/;
export function rgb(color) {
  const parsed = HSV.exec(color)[1]
    .split(",")
    .map(i => parseInt(i, 10));
  const c = hsvToRgb.apply(null, parsed);
  return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}

function getAlbumInfo(set, name) {
  const clip = set.clips[name];
  const { meta, audio } = clip;
  const filename = clip.audio.filename;
  const covers = set.loader.sources.covers;

  const imageUrl = covers ? covers[0].replace("{{filename}}", filename) : "";
  const bpm = set.meta.bpm || 120;

  return {
    lnglat: meta.lnglat,
    year: meta.year,
    country: meta.country,
    title: meta.title,
    artist: meta.artist,
    album: meta.album,
    trackNumber: audio.track !== undefined ? parseInt(audio.track, 10) : 1,
    loopend: audio.loopend || 1,
    trackVolume: audio.trackVolume || 0.7,
    duration: 60 * audio.beats / bpm, // clip duration in seconds
    imageUrl,
    trackColor: rgb(clip.display.color)
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

    if (this.set.visuals.imprint) createImprint(info.lnglat, info.trackColor);
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
      .attr("id", d => `country${d.id}`)
      .attr("class", "countries")
      .attr("d", path)
      .style("stroke", "#2c2c2c")
      .style("stroke-width", 0.5)
      .style("fill", d => (d.id === "010" ? "none" : "#888888")); // 010 Antartica
  }
}
