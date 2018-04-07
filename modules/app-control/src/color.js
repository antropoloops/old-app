import hsvToRgb from "hsv-rgb";

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
  const h = H[number % MAX];
  const c = hsvToRgb(random(h), random(S), random(V));
  console.log("color", c);
  return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}

export default getColor;
