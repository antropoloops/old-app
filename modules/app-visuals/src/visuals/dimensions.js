import * as d3geo from "d3-geo-projection";

export function getScreenSize(fixedAspectRatio) {
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;
  const realAspectRatio = wWidth / wHeight;

  const screenWidth =
    realAspectRatio < fixedAspectRatio ? wWidth : wHeight * fixedAspectRatio;
  const screenHeight =
    realAspectRatio < fixedAspectRatio ? wWidth / fixedAspectRatio : wHeight;

  return { screenWidth, screenHeight };
}

export const RATIOS = {
  sixteenNinths: 16 / 9,
  sixteenTenths: 16 / 10
};

export function getScale(fixedAspectRatio) {
  const { screenWidth } = getScreenSize(fixedAspectRatio);
  return fixedAspectRatio === RATIOS.sixteenTenths
    ? screenWidth / 5.9
    : screenWidth / 6.5;
}

export function createProjection(width, height, scale) {
  return d3geo
    .geoRobinson()
    .scale(scale)
    .translate([width / 2, height / 2 + height / 15])
    .rotate([-10, 0, 0]);
}
