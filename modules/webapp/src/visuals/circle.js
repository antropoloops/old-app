import * as d3 from "d3";

// Number of slices in a cirlce
const circleNumSlices = 36;

const degreesToSlice = d3
  .scaleLinear()
  .range([0, 360]) // working in degrees
  .domain([0, circleNumSlices]);

export function createCircle(parent, cx, cy, duration) {
  const circlesGroup = parent
    .append("g")
    .attr("transform", `translate(${cx}, ${cy})`);

  // Sin empaquetar todo en este segundo grupo no gira en su sitio
  const circle = circlesGroup.append("g");

  circle
    .append("animateTransform")
    .attr("attributeType", "xml")
    .attr("attributeName", "transform")
    .attr("type", "rotate")
    .attr("from", "0 0 0 ")
    .attr("to", "360 0 0 ")
    .attr("dur", duration + "s")
    .attr("repeatCount", "indefinite");

  // create arc generator
  const arc = d3.arc();
  const outerArcs = createOuterArcs(circleNumSlices);
  circle
    .selectAll(".outerArcs")
    .data(outerArcs)
    .enter()
    .append("path")
    .attr("class", "outerArcs")
    .attr("d", arc)
    .style("fill", "orange")
    .style("opacity", (d, i) => {
      return 0.3 / circleNumSlices * i;
    });

  const innerArcs = createInnerArcs(circleNumSlices);
  circle
    .selectAll(".arcs")
    .data(innerArcs)
    .enter()
    .append("path")
    .attr("class", "arcs")
    .attr("d", arc)
    .style("fill", "orange")
    .style("opacity", (d, i) => {
      return 1 / circleNumSlices * i;
    });

  return circlesGroup;
}

function createInnerArcs(circleNumSlices) {
  return d3.range(circleNumSlices).map((d, i) => {
    return {
      startAngle: deg2rad(degreesToSlice(d)), // working in degrees
      endAngle:
        i === circleNumSlices - 1
          ? deg2rad(degreesToSlice(d + 1))
          : deg2rad(degreesToSlice(d + 2)),
      innerRadius: 0,
      outerRadius: 20
    };
  });
}

function createOuterArcs(circleNumSlices) {
  return d3.range(circleNumSlices).map((d, i) => {
    return {
      startAngle: deg2rad(degreesToSlice(d)), // working in degrees
      endAngle:
        i === circleNumSlices - 1
          ? deg2rad(degreesToSlice(d + 1))
          : deg2rad(degreesToSlice(d + 2)),
      innerRadius: 0,
      outerRadius: 30
    };
  });
}

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}
