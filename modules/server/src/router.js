const express = require("express");
const config = require("config");
const ip = require("ip");

const PORT = config.get("port");

const router = express.Router();

router.get("/status", (req, res) => {
  const address = "http://" + ip.address() + ":" + PORT + "/";
  res.json({ address });
});

module.exports = router;
