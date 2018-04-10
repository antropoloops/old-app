import React from "react";
import Pad from "./Pad";
import { rgb } from "../color";
import "./App.css";

// get sample name from a set
// given a url with port, change the port to the one from current window
const withCurrentPort = url => {
  const base = url.slice(0, url.lastIndexOf(":"));
  const port = window.origin.slice(window.origin.lastIndexOf(":") + 1);
  return base + ":" + port;
};

const keySet = keyboard => {
  const keys = Object.keys(keyboard);
  const sample = key => keyboard[key].sample;
  const revMap = keys.reduce((r, key) => {
    r[sample(key)] = key;
    return r;
  }, {});
  const key = sample => revMap[sample];
  return { keys, sample, key };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const { set } = this.props;
    this.keySet = keySet(set.keyboard);
    console.log(this.sampleToKey);
    this.state = { pressed: {} };
  }
  componentDidMount() {
    const { socket, events } = this.props;
    socket.on("message", (name, data) => {
      events.emit(name, data);
    });
    events.on("/audio/start", sample => this.setPressed(true, sample));
    events.on("/audio/stop", sample => this.setPressed(false, sample));
  }
  componentWillUnmount() {
    const { socket, events } = this.props;
    socket.off("message");
  }

  setPressed(isPressed, sample) {
    const key = this.keySet.key(sample);
    if (key) {
      const pressed = this.state.pressed;
      pressed[key] = isPressed;
      this.setState({ pressed });
    }
  }

  emit(isPressed, key) {
    const { socket, events } = this.props;
    const sample = this.keySet.sample(key);
    const event = isPressed ? "/audio/start" : "/audio/stop";
    socket.send(event, sample);
    events.emit(event, sample);
  }

  render() {
    const { set, url } = this.props;
    const { pressed } = this.state;
    const color = sample => rgb(set.samples[sample].meta.color);
    return (
      <div className="App">
        <div className="header">
          {set.title} ({withCurrentPort(url)})
        </div>
        <div className="pads">
          {this.keySet.keys.map((key, i) => (
            <Pad
              key={key}
              keyboard={key}
              color={color(this.keySet.sample(key))}
              pressed={pressed[key] === true}
              onPress={() => this.emit(true, key)}
              onRelease={() => this.emit(false, key)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
