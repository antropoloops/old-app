const express = require("express");
const compress = require("compression");
// const favicon = require("serve-favicon");
const cors = require("cors");
// const logger = require("winston");
const staticRoutes = require("./static");
const router = require("./router");

const app = express();
app.use(compress());
app.use(cors());
app.use(function(req, res, next) {
  console.log("Request: ", req.originalUrl);
  next();
});
app.use(router);
app.use(staticRoutes);

module.exports = app;
