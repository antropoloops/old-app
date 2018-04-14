import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { branch, renderComponent } from "recompose";
import "./index.css";
import App from "./App";

const Spinner = () => <div>Loading...</div>;

fetch("http://localhost:3333/sets/lik03.audioset.json")
  .then(r => r.json())
  .then(set => {
    ReactDOM.render(<App set={set} />, document.getElementById("root"));
  });

ReactDOM.render(<Spinner />, document.getElementById("root"));
registerServiceWorker();
