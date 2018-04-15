import hsvToRgb from "hsv-rgb";

const HSV = /^hsv\((.*)\)$/;
export function rgb(color) {
  const parsed = HSV.exec(color)[1]
    .split(",")
    .map(i => parseInt(i, 10));
  const c = hsvToRgb.apply(null, parsed);
  return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}

export default function migrate(set) {
  console.log("migrate set!", set);
  Object.keys(set.clips).forEach(name => {
    const clip = set.clips[name];
    clip.id = name;
    clip.display.color = rgb(clip.display.color);
  });
  return set;
}
