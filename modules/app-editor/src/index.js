import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";

import registerServiceWorker from "./registerServiceWorker";
import createStore from "./data/createStore";
import { Router } from "react-router-dom";
import { loadAllAudiosets, loadAudioset } from "./data/model/audiosets";
import App from "./ui/App";
import "./index.css";

const history = createBrowserHistory();
const store = createStore();
history.listen((location, action) => {
  if (location.pathname.startsWith("/set/")) {
    store.dispatch(loadAudioset(location.pathname.slice(5)));
  }
  console.log("history changed", location.pathname, action);
});
console.log("joder", history);

store.dispatch(loadAllAudiosets());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
