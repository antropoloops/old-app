const OSC = require("osc-js");

const config = {
  udpClient: { port: 9000 },
  udpServer: { port: 9001 }
};
const osc = new OSC({ plugin: new OSC.BridgePlugin(config) });

module.exports = osc;
