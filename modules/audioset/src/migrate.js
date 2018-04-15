import hsvToRgb from "hsv-rgb";

const HSV = /^hsv\((.*)\)$/;
function rgb(color) {
  const parsed = HSV.exec(color)[1]
    .split(",")
    .map(function(i) {
      return parseInt(i, 10);
    });
  const c = hsvToRgb.apply(null, parsed);
  return "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")";
}

function resourceUrl(name, resource) {
  const url =
    resource && resource.length
      ? resource[0].replace("{{filename}}", name)
      : "";
  return url;
}

export default function migrate(set) {
  console.log("migrate", set.id);
  Object.keys(set.clips).forEach(function(name) {
    const clip = set.clips[name];
    clip.id = name;
    clip.display.color = rgb(clip.display.color);
    clip.display.cover = resourceUrl(name, set.loader.sources.covers);
    console.log(clip.display);
  });
  return set;
}
