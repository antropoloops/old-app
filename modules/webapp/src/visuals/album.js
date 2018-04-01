const albumsCount = 8;
const dotRadius = 2;

function getHorizontalPadding(screenWidth) {
  return screenWidth / 300;
}

function getVerticalPadding(screenWidth) {
  return screenWidth / 450;
}

function getInfoHeight(screenWidth) {
  return screenWidth / 50;
}

function getCoverSize(screenWidth) {
  return screenWidth / albumsCount;
}

export function getDotOffsetX(screenWidth, trackNumber) {
  return trackNumber * getCoverSize(screenWidth) + dotRadius;
}

export function getAlbumHeight(screenWidth) {
  const verticalPadding = getVerticalPadding(screenWidth);
  const infoHeight = getInfoHeight(screenWidth);
  return getCoverSize(screenWidth) + verticalPadding + infoHeight * 2;
}

export function createAlbum(
  parent,
  screenWidth,
  { trackNumber, imageUrl, year, country, trackColor }
) {
  const album = parent.append("g");
  const coverSize = getCoverSize(screenWidth);
  const horizontalPadding = getHorizontalPadding(screenWidth);
  const verticalPadding = getVerticalPadding(screenWidth);
  const dotOffsetX = getDotOffsetX(screenWidth, trackNumber);
  const infoHeight = getInfoHeight(screenWidth);
  const fontSize = "1.1vw";

  album
    .append("svg:image")
    .attr("width", coverSize)
    .attr("height", coverSize)
    .attr("x", trackNumber * coverSize)
    .attr("y", 0)
    .style("stroke", "white")
    .attr("xlink:href", imageUrl);

  // Draw country rectangle
  album
    .append("rect")
    .attr("width", coverSize)
    .attr("height", infoHeight)
    .attr("x", trackNumber * coverSize)
    .attr("y", coverSize + verticalPadding)
    .style("fill", trackColor);

  // Draw country text
  const countryText = album
    .append("text")
    .attr("id", "countryText" + trackNumber)
    .attr("x", trackNumber * coverSize + horizontalPadding)
    .attr("y", coverSize + verticalPadding + infoHeight / 2)
    .attr("dy", "0.35em")
    .style("font-size", fontSize)
    .text(country);

  // Trucate text larger than coverSize
  const countryTextId = "countryText" + trackNumber;
  function wrap(textElement, textId) {
    let textLength = document.getElementById(textId).getBBox().width;
    let text = textElement.text();

    while (textLength > coverSize - horizontalPadding * 2 && text.length > 0) {
      text = text.slice(0, -1);
      textElement.text(text + "...");
      textLength = document.getElementById(textId).getBBox().width;
    }
  }
  wrap(countryText, countryTextId);

  // Draw date point
  album
    .append("circle")
    .attr("cx", dotOffsetX)
    .attr("cy", coverSize + verticalPadding + infoHeight * 2)
    .attr("r", dotRadius)
    .style("fill", trackColor);

  // Draw date text
  album
    .append("text")
    .attr("x", trackNumber * coverSize + horizontalPadding)
    .attr("y", coverSize + verticalPadding + infoHeight * 1.5)
    .attr("dy", "0.35em")
    .style("font-size", fontSize)
    .style("fill", trackColor)
    .text(year);

  return album;
}
