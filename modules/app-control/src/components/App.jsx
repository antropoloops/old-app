import React from "react";
import Pad from "./Pad";
import color from "../color";
import "./App.css";

const validKeys = set => Object.keys(set.keyboard);

const send = event => (key, set, socket) => e => {
  const sample = set.keyboard[key].sample;
  socket.send(event, sample);
};

const handlePress = send("/sample/start");
const handleRelease = send("/sample/stop");

const withCurrentPort = url => {
  const base = url.slice(0, url.lastIndexOf(":"));
  const port = window.origin.slice(window.origin.lastIndexOf(":") + 1);
  return base + ":" + port;
};

const App = ({ set, socket, url }) => (
  <div className="App">
    <div className="header">
      {set.title} ({withCurrentPort(url)})
    </div>
    <div className="pads">
      {validKeys(set).map((key, i) => (
        <Pad
          key={key}
          keyboard={key}
          color={color(i)}
          onPress={handlePress(key, set, socket)}
          onRelease={handleRelease(key, set, socket)}
        />
      ))}
    </div>
  </div>
);

export default App;
