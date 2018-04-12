const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const _ = require("lodash");

const writeFile = promisify(fs.writeFile);
const input = name => path.join(__dirname, ".", name + ".audioset.json");
const output = name => path.join(__dirname, "..", name + ".audioset.json");

const NAMES = ["test", "continentes", "lik03"];

function migrate(migration) {
  const promises = NAMES.map(name => [name, require(input(name))])
    .map(([name, set]) => migration(name, set))
    .map(set => writeFile(output(set.id), JSON.stringify(set, null, 2)));

  Promise.all(promises).then(() => console.log("done"));
}

//// PRIVATE
const withExtension = (name, ext) => (name.endsWith(ext) ? name : name + ext);

function convert(name, set) {
  const { title, description } = set;
  const clips = _.mapValues(set.samples, (sample, i) =>
    Object.assign(
      {},
      sample,
      {
        meta: _.pick(sample.meta, [
          "title",
          "album",
          "artis",
          "year",
          "country",
          "lnglat"
        ]),
        audio: {
          filename: withExtension(sample.filename, ".wav"),
          track: _.get(sample, "parameters.track", "samples"),
          position: _.get(sample, "parameters.position", i),
          duration: _.get(sample, "parameters.loopend", 1),
          volume: _.get(sample, "parameters.trackVolume", 0.7)
        },
        visuals: {
          color: _.get(sample, "meta.color", "hsv(106,89,98)")
        }
      },
      {
        filename: undefined,
        parameters: undefined
      }
    )
  );
  return {
    id: name,
    format: "audioset-2",
    meta: { title, description },
    defaults: {},
    clips
  };
}

migrate(convert);
