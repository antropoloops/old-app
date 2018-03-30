import * as d3 from "d3";
import { getColor } from "./color";

export function createWave(parent, cx, cy, trackNumber) {
  const first = 1;
  const last = 100;
  const radius = d3.range(first, last);
  const duration = 20;

  const wave = parent
    .append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 0)
    .style("fill", "none")
    .style("stroke", getColor(trackNumber));

  radius.forEach((d, i) => {
    const initialWidth = 30;
    const minWidth = initialWidth / radius[last - first - 1];
    const strokeWidth = initialWidth / d > minWidth ? initialWidth / d : 0;
    wave
      .transition()
      .duration(duration)
      .delay(i * duration)
      .attr("r", d)
      .style("stroke-width", strokeWidth);
  });

  return wave;
}
