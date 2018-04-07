const { join } = require("path");
const express = require("express");
// Static files
const CONFIG = {
  "/data": "../../../data",
  "/audio": "../../../data/audiosets",
  "/sets": "../../webapp/build",
  "/app": "../../webapp/build",
  "/control": "../../app-control/build",
  "/": "../public"
};

const router = express.Router();

Object.keys(CONFIG).forEach(url => {
  const path = join(__dirname, CONFIG[url]);
  console.log(url, path);
  router.use(url, express.static(path));
});

module.exports = router;
