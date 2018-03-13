import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as FullScreen from "./full-screen";

export default function init(manager) {
  FullScreen.init();
  ReactDOM.render(<App manager={manager} />, document.getElementById("app"));
}
