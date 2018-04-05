import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as FullScreen from "./full-screen";
import io from "socket.io-client";

if (process.env.NODE_ENV !== "production") {
  const socket = io("localhost:3333");
  console.log("socket!", socket);
  socket.on("message", (evt, data) => {
    console.log("IO Message", evt, data);
  });
}

export default function init(manager) {
  FullScreen.init();
  ReactDOM.render(<App manager={manager} />, document.getElementById("app"));
}
