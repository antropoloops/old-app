const fs = require("fs");
const { promisify } = require("util");
const data = require("./uno");

const writeFile = promisify(fs.writeFile);

console.log(data);
