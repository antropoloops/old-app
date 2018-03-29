const dgram = require("dgram");
const { Message } = require("osc-js");

const PORT = 9001;
const HOST = process.env.HOST || "localhost";
const OSC_MSG = process.env.OSC_MSG || "/atpls/ping";
const OSC_VAL = process.env.OSC_VAL || Math.floor(10 * Math.random());

const socket = dgram.createSocket("udp4");
socket.on("error", err => {
  console.log("error", err);
});
// send a messsage via udp
const message = new Message(OSC_MSG, OSC_VAL);
console.log("Sending message", message);
const binary = message.pack();
socket.send(new Buffer(binary), 0, binary.byteLength, PORT, HOST);

socket.on("listening", () => {
  // receive a message via UDP
  socket.on("message", data => {
    const msg = new Message();
    msg.unpack(data);
    console.log("Message arrived", msg.args);
  });
});
