const fs = require("fs");
const { promisify } = require("util");
const data = require("./lik03.csv.json");
const reference = require("./continentes.audioset.json");

const refSamples = Object.keys(reference.samples).map(
  key => reference.samples[key]
);
const refLen = refSamples.length;

const writeFile = promisify(fs.writeFile);

function convert(samples) {
  const all = samples.reduce((all, sample, i) => {
    if (sample.nombreWav === "") return all;
    const [set, track, clip] = sample.nombreWav.split("-");
    all[sample.nombreWav] = {
      filename: sample.nombreWav,
      parameters: { track, position: parseInt(clip.slice(1)) },
      meta: {
        title: sample.titulo,
        album: sample.album,
        artist: sample.artista,
        year: sample.fecha,
        country: sample.lugar,
        tags: [],
        lnglat: refSamples[i % refLen].meta.lnglat,
        cover: "lik03-covers/" + sample.nombreWav + ".jpg",
        color: refSamples[i % refLen].meta.color
      }
    };
    return all;
  }, {});

  return {
    format: "audioset-1",
    id: "lik-03",
    title: "Lik03",
    description: "Antropoloops Lik Session 03",
    loader: {
      sources: {
        audio: {
          urls: ["https://storage.googleapis.com/atpls-sets/lik/"]
        }
      }
    },
    samples: all
  };
}

writeFile("lik03.audioset.json", JSON.stringify(convert(data, null, 2))).then(
  () => {
    console.log("done");
  }
);
