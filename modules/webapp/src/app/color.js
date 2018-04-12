import hsvToRgb from "hsv-rgb";

export function convertColors(set) {
  const clips = set.clips;
  Object.keys(clips).forEach(name => {
    const clip = clips[name];
    clip.display.color = rgb(clip.display.color);
  });
}

const HSV = /^hsv\((.*)\)$/;
export function rgb(color) {
  const parsed = HSV.exec(color)[1]
    .split(",")
    .map(i => parseInt(i));
  const c = hsvToRgb.apply(null, parsed);
  return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}
