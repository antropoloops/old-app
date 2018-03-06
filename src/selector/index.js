import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as FullScreen from "./full-screen";

export default function init(set, events) {
  FullScreen.init();
  ReactDOM.render(
    <App set={set} events={events} />,
    document.getElementById("app")
  );
}
