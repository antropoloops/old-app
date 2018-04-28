import hsvToRgb from "hsv-rgb";
import { resourceUrl } from "@atpls/audioset";

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

export default function migrate(set) {
  Object.keys(set.clips).forEach(function(name) {
    const clip = set.clips[name];
    clip.id = name;
    clip.display.color = rgb(clip.display.color);
    clip.display.cover = resourceUrl(name, set.loader.sources.covers);
    clip.display.audiosrc = resourceUrl(name, set.loader.sources.audio);
    if (set.audio.defaults) Object.assign(clip.audio, set.audio.defaults);
  });
  return set;
}
