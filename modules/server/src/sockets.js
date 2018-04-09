const socketio = require("socket.io");

function sockets(server) {
  const io = socketio(server);

  io.on("connection", function(socket) {
    console.log("WS Connected!");
    socket.send("/hello", "antropoloops");
    socket.on("message", function(evt, data) {
      socket.broadcast.send(evt, data);
      console.log("IO message", evt, data);
    });
  });

  return io;
}

module.exports = sockets;
