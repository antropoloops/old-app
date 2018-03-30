import * as d3 from "d3";

// Number of slices in a circle
const circleNumSlices = 36;

// Scale. Get the degrees for a specific slice
const degreesFromSlice = d3
  .scaleLinear()
  .range([0, 360]) // working in degrees
  .domain([0, circleNumSlices]);

export function createCircle(
  parent,
  screenWidth,
  cx,
  cy,
  { duration, trackVolume, trackColor }
) {
  const circlesGroup = parent
    .append("g")
    .attr("transform", `translate(${cx}, ${cy})`);

  // We need to group again, so that the circle turns in its location
  const circle = circlesGroup.append("g");

  // Add CSS animation to make the circle turn
  circle
    .append("animateTransform")
    .attr("attributeType", "xml")
    .attr("attributeName", "transform")
    .attr("type", "rotate")
    .attr("from", "0 0 0 ")
    .attr("to", "360 0 0 ")
    .attr("dur", duration + "s")
    .attr("repeatCount", "indefinite");

  // Arc generator
  const arc = d3.arc();

  // Create outerArcs data
  const outerArcs = createOuterArcs(circleNumSlices, screenWidth, trackVolume);

  // Draw outerArcs
  circle
    .selectAll(".outerArcs")
    .data(outerArcs)
    .enter()
    .append("path")
    .attr("class", "outerArcs")
    .attr("d", arc)
    .style("fill", trackColor)
    .style("opacity", (d, i) => {
      return 0.3 / circleNumSlices * i;
    });

  // Create innerArcs data
  const innerArcs = createInnerArcs(circleNumSlices, screenWidth, trackVolume);

  // Draw innerArcs
  circle
    .selectAll(".arcs")
    .data(innerArcs)
    .enter()
    .append("path")
    .attr("class", "arcs")
    .attr("d", arc)
    .style("fill", trackColor)
    .style("opacity", (d, i) => {
      return 1 / circleNumSlices * i;
    });

  return circlesGroup;
}

function createInnerArcs(circleNumSlices, screenWidth, trackVolume) {
  return d3.range(circleNumSlices).map((d, i) => {
    return {
      startAngle: deg2rad(degreesFromSlice(d)),
      endAngle:
        i === circleNumSlices - 1
          ? deg2rad(degreesFromSlice(d + 1))
          : deg2rad(degreesFromSlice(d + 2)),
      innerRadius: 0,
      outerRadius: screenWidth / 30 * trackVolume
    };
  });
}

function createOuterArcs(circleNumSlices, screenWidth, trackVolume) {
  return d3.range(circleNumSlices).map((d, i) => {
    return {
      startAngle: deg2rad(degreesFromSlice(d)),
      endAngle:
        i === circleNumSlices - 1
          ? deg2rad(degreesFromSlice(d + 1))
          : deg2rad(degreesFromSlice(d + 2)),
      innerRadius: 0,
      outerRadius: screenWidth / 30 * trackVolume * 2
    };
  });
}

// Transform degrees into radians
function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}
