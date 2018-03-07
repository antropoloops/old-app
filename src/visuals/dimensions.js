import * as d3geo from "d3-geo-projection";

export function getWidthHeight(fixedAspectRatio) {
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  const realAspectRatio = wWidth / wHeight;

  const width =
    realAspectRatio < fixedAspectRatio ? wWidth : wHeight * fixedAspectRatio;
  const height =
    realAspectRatio < fixedAspectRatio ? wWidth / fixedAspectRatio : wHeight;

  return { width, height };
}

export const RATIOS = {
  sixteenNinths: 16 / 9,
  sixteenTenths: 16 / 10
};

export function getScale(fixedAspectRatio) {
  const { width } = getWidthHeight(fixedAspectRatio);
  return fixedAspectRatio === RATIOS.sixteenTenths ? width / 5.9 : width / 6.5;
}

export function createProjection(width, height, scale) {
  return d3geo
    .geoRobinson()
    .scale(scale)
    .translate([width / 2, height / 2 + height / 15])
    .rotate([-10, 0, 0]);
}