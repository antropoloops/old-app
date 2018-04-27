const { join } = require("path");
const express = require("express");
// Static files
const CONFIG = {
  "/data": "../../../data",
  "/audiosets": "../../../data/audiosets",
  "/sets": "../../audioset/sets",
  "/app": "../../app-visuals/build",
  "/control": "../../app-control/build",
  "/browser": "../../app-browser/build",
  "/": "../public"
};

const router = express.Router();

Object.keys(CONFIG).forEach(url => {
  const path = join(__dirname, CONFIG[url]);
  console.log("joder", url, path);
  router.use(url, express.static(path));
});

module.exports = router;
