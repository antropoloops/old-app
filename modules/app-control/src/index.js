import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import wsConnectHoc from "./ws-connect.hoc";
import loadSetHoc from "./load-set.hoc";

const ConnectedApp = wsConnectHoc(loadSetHoc(App));

ReactDOM.render(<ConnectedApp />, document.getElementById("root"));
registerServiceWorker();
