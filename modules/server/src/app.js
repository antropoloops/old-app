const path = require("path");
const express = require("express");
const compress = require("compression");
// const favicon = require("serve-favicon");
const cors = require("cors");
// const logger = require("winston");

const app = express();
app.use(compress());
app.use(cors());
app.use(function(req, res, next) {
  console.log("Request: ", req.originalUrl);
  next();
});
app.use("/data", express.static(path.join(__dirname, "../../../data")));
app.use("/app", express.static(path.join(__dirname, "../../webapp/build")));
app.use("/", express.static(path.join(__dirname, "../public")));

module.exports = app;
