const OSC = require("osc-js");
const ip = require("ip");

const config = {
  udpServer: {
    host: ip.address(),
    port: 9000,
    exclusive: false
  },
  udpClient: {
    host: ip.address(),
    port: 9001
  },
  wsServer: {
    host: ip.address(),
    port: 8888
  },
  receiver: "ws"
};

console.log("Starting osc servers", config);
const osc = new OSC({ plugin: new OSC.BridgePlugin(config) });

module.exports = osc;
