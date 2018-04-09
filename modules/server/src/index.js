/* eslint-disable no-console */
const logger = require("winston");
const app = require("./app");
const config = require("config");
const sockets = require("./sockets");
const ip = require("ip");

const PORT = config.get("port");
const address = "http://" + ip.address() + ":" + PORT;

logger.info("Antropoloops server %s", address);

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

const server = app.listen(PORT);

sockets(server).on("listening", () => {
  logger.info("OSC ws server started");
  logger.info("Open app %s/app ", address);
});
