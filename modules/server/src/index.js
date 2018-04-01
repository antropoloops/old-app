/* eslint-disable no-console */
const logger = require("winston");
const app = require("./app");
const config = require("config");
const ip = require("ip");

const port = config.get("port");
const server = app.listen(port);

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () => {
  const address = "http://" + ip.address() + ":" + port;
  logger.info("Antropoloops server started on %s", address);
  logger.info("Open app %s/app ", address);
});
