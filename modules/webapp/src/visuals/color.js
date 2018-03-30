import * as chroma from "chroma-js";
import * as d3 from "d3";
// import * as seedrandom from "seedrandom";

export function getColor(trackNumber) {
  // const seedRandom = seedrandom("abcde");
  // const S = d3.randomUniform.source(seedRandom)(0.5, 1)();
  const S = d3.randomUniform(0.5, 1)();
  const V = d3.randomUniform(0.8, 1)();
  const H =
    trackNumber === 0
      ? d3.randomUniform(105, 120)()
      : trackNumber === 1
        ? d3.randomUniform(145, 160)()
        : trackNumber === 2
          ? d3.randomUniform(300, 315)()
          : trackNumber === 3
            ? d3.randomUniform(330, 345)()
            : trackNumber === 4
              ? d3.randomUniform(190, 205)()
              : trackNumber === 5
                ? d3.randomUniform(210, 225)()
                : trackNumber === 6
                  ? d3.randomUniform(25, 40)()
                  : d3.randomUniform(50, 65)();
  return chroma.hsv(H, S, V).hex();
}
