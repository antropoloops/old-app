export const albumsCount = 8;
export const verticalPadding = 3;
export const horizontalPadding = 3;
export const infoHeight = 20;
export const dotRadius = 2;

export function getDotOffsetX(windowWidth, trackNumber) {
  return (
    trackNumber * getCoverSize(windowWidth) + horizontalPadding + dotRadius
  );
}

function getCoverSize(windowWidth) {
  return windowWidth / albumsCount;
}

export function getAlbumHeight(windowWidth) {
  return getCoverSize(windowWidth) + verticalPadding + infoHeight * 2;
}

export function createAlbum(
  parent,
  windowWidth,
  { trackNumber, imageUrl, year, country }
) {
  const cover = parent.append("g");
  const coverSize = getCoverSize(windowWidth);

  cover
    .append("svg:image")
    .attr("width", coverSize)
    .attr("height", coverSize)
    .attr("x", trackNumber * coverSize)
    .attr("y", 0)
    .style("stroke", "white")
    .attr("xlink:href", imageUrl);

  // Draw country rectangle
  cover
    .append("rect")
    .attr("width", coverSize)
    .attr("height", infoHeight)
    .attr("x", trackNumber * coverSize)
    .attr("y", coverSize + verticalPadding)
    .style("fill", "orange");

  // Draw country text
  cover
    .append("text")
    .attr("x", trackNumber * coverSize + horizontalPadding)
    .attr("y", coverSize + verticalPadding + infoHeight / 2)
    .attr("dy", "0.35em")
    .style("font-size", 11 + "px")
    .text(country);

  // Draw date point
  cover
    .append("circle")
    .attr("cx", trackNumber * coverSize + horizontalPadding + dotRadius)
    .attr("cy", coverSize + verticalPadding + infoHeight * 2)
    .attr("r", dotRadius)
    .style("fill", "orange");

  // Draw date text
  cover
    .append("text")
    .attr("x", trackNumber * coverSize + horizontalPadding)
    .attr("y", coverSize + verticalPadding + infoHeight * 1.5)
    .attr("dy", "0.35em")
    .style("font-size", 11 + "px")
    .style("font-weight", "bold")
    .style("fill", "orange")
    .text(year);

  return cover;
}
