import * as d3 from "d3";

export default function addFullScreen() {
  d3.select(".svgMap").on("click", (d, i, node) => {
    const el = node[i];
    const rfs =
      el.requestFullscreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullscreen;

    rfs.call(el);
  });
}
