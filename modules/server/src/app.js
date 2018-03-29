const path = require("path");
const express = require("express");
// const favicon = require("serve-favicon");
const compress = require("compression");
const cors = require("cors");
const logger = require("winston");

const app = express();
app.use(compress());
app.use("/data", express.static(path.join(__dirname, "../../../data")));
app.use("/public", express.static(path.join(__dirname, "../public")));

module.exports = app;
