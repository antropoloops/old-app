/* eslint-disable no-console */
const logger = require("winston");
const app = require("./app");
const config = require("config");

const port = config.get("port");
const server = app.listen(port);

const oscServer = require("./osc");

oscServer.open();

process.on("unhandledRejection", (reason, p) =>
  logger.error("Unhandled Rejection at: Promise ", p, reason)
);

server.on("listening", () =>
  logger.info(
    "Antropoloops server started on http://%s:%d",
    app.get("host"),
    port
  )
);
