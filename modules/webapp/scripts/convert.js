// a hack script to modify data
// const random = require("random-coordinates");
const data = require("../public/continentes.audioset.json");

const names = Object.keys(data.samples);
const keys = "qwertyasdfghzxcvbn".split("");

const keyboard = {};

names.forEach((sample, index) => {
  const key = keys[index];
  keyboard[key] = { sample, type: "gate" };
});
console.log(JSON.stringify(keyboard));

//const fs = require("fs");
//fs.writeFileSync("data.json", JSON.stringify(data), "utf8");
