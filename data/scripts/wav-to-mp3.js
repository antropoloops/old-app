// https://trac.ffmpeg.org/wiki/Encode/MP3
// brew install ffmpeg

const path = require("path");
const exec = require("child_process").exec;
const fs = require("fs");

const set = process.env.SET;

if (!set) {
  console.log("Usage: SET=continentes node scripts/wav-to-mp3.js");
  return;
}
const base = path.resolve(__dirname, "..", set);

if (!fs.existsSync(base)) {
  console.log("Set not found", base);
  return;
}

fs.readdirSync("./" + set).forEach(file => {
  const ext = path.extname(file);
  const name = file.slice(0, -ext.length);
  if (ext === ".wav") convert(base, name);
});

function convert(base, name) {
  const sourceFile = path.join(base, name + ".wav");
  const outputFile = path.join(base, name + ".mp3");
  console.log("Processing", sourceFile);
  const cmd = `ffmpeg -i ${sourceFile} -codec:a libmp3lame -qscale:a 3 ${outputFile}`;
  console.log(cmd);
  console.log(cmd, exec(cmd));
}
