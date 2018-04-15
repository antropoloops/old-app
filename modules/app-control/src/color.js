import hsvToRgb from "hsv-rgb";

const cache = {};

const HSV = /^hsv\((.*)\)$/;
export function rgb(color) {
  if (cache[color]) return cache[color];
  const parsed = HSV.exec(color)[1]
    .split(",")
    .map(i => parseInt(i, 10));
  const c = hsvToRgb.apply(null, parsed);
  cache[color] = "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
  return cache[color];
}

const S = [0.5 * 100, 1 * 100];
const V = [0.9 * 100, 1 * 100];
const H = [
  [105, 120],
  [145, 160],
  [300, 315],
  [330, 345],
  [190, 205],
  [210, 225],
  [25, 40],
  [50, 65]
];
const MAX = H.length;

function random(range) {
  const [min, max] = range;
  return Math.floor(Math.random() * (max - min) + min);
}

function getColor(number) {
  const h = random(H[number % MAX]);
  const s = random(S);
  const v = random(V);
  console.log("hsv(" + h + "," + s + "," + v + ")");
  const c = hsvToRgb(h, s, v);
  return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}

export default getColor;
