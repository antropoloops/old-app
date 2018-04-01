import * as d3 from "d3";

export function createWave(
  parent,
  screenWidth,
  cx,
  cy,
  trackColor,
  trackVolume
) {
  const first = Math.floor(screenWidth / 30 * trackVolume);
  const last = 150;
  const radius = d3.range(first, last);
  const duration = 20;

  const wave = parent
    .append("circle")
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("r", 0)
    .style("fill", "none")
    .style("stroke", trackColor);

  radius.forEach((r, i) => {
    const initialWidth = 2;
    const strokeWidth = initialWidth - initialWidth * r / last;
    wave
      .transition()
      .duration(duration)
      .delay(i * duration)
      .attr("r", r)
      .style("stroke-width", strokeWidth)
      .on("end", (d, i, nodes) => {
        if (r === last - 1) nodes[i].remove();
      });
  });

  return wave;
}
