const _ = require("lodash");
const data = require("@atpls/audioset/sets/lik03.audioset.json");

async function main() {
  const names = _.map(data.clips, clip => clip.audio.filename).map(
    name =>
      `wget https://storage.googleapis.com/atpls-sets/lik/lik03-covers/${name}.jpg ${name}.jpg`
  );

  console.log(names.join("\n"));
}

main();
