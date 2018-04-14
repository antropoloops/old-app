import React from "react";
import Pad from "./Pad";
import { rgb } from "../color";
import "./App.css";

const mapValues = (object, cb) =>
  Object.keys(object).map((key, i) => cb(key, object[key], i));

// get clip name from a set
// given a url with port, change the port to the one from current window
const withCurrentPort = url => {
  const base = url.slice(0, url.lastIndexOf(":"));
  const port = window.origin.slice(window.origin.lastIndexOf(":") + 1);
  return base + ":" + port;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pressed: {} };
  }

  componentDidMount() {
    const { events } = this.props;
    events.on("/clip/start", clip => this.setPressed(true, clip));
    events.on("/clip/stop", clip => this.setPressed(false, clip));
    events.on("/audio/stopped", clip => this.setPressed(false, clip));
  }
  nocomponentWillUnmount() {
    const { socket } = this.props;
    socket.off("message");
  }

  setPressed(isPressed, name) {
    const pressed = this.state.pressed;
    pressed[name] = isPressed;
    this.setState({ pressed });
  }

  emit(isPressed, name) {
    const event = isPressed ? "/clip/start" : "/clip/stop";
    this.props.events.emit(event, name);
    this.setPressed(isPressed, name);
  }

  render() {
    const { pressed } = this.state;
    const { set, url } = this.props;
    const currentLink = withCurrentPort(url) + "/#" + set.id;
    return (
      <div className="App">
        <div className="header">
          <a href={currentLink} alt="open">
            {currentLink}
          </a>
        </div>
        <div className="pads">
          {mapValues(set.clips, (name, clip) => (
            <Pad
              key={name}
              keyboard={null}
              color={rgb(clip.display.color)}
              pressed={pressed[name]}
              onPress={() => this.emit(true, name)}
              onRelease={() => this.emit(false, name)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
