import hsvToRgb from "hsv-rgb";

export function convertColors(set) {
  const samples = set.samples;
  Object.keys(samples).forEach(name => {
    const sample = samples[name];
    sample.meta.color = rgb(sample.meta.color);
  });
}

const HSV = /^hsv\((.*)\)$/;
export function rgb(color) {
  const parsed = HSV.exec(color)[1]
    .split(",")
    .map(i => parseInt(i));
  console.log(parsed);
  const c = hsvToRgb.apply(null, parsed);
  return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}
