import React from "react";
import ClipList from "./components/ClipList";
import GroupList from "./components/GroupList";
import "./App.css";

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
    // FIXME
    const { clips } = this.props.set;
    Object.keys(clips).forEach(name => {
      clips[name].id = name;
    });
    this.state = { pressed: {} };
  }

  componentDidMount() {
    const { events } = this.props;
    events.on("/clip/start", clip => this.setPressed(true, clip));
    events.on("/clip/stop", clip => this.setPressed(false, clip));
    events.on("/audio/stopped", clip => this.setPressed(false, clip));
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
    const tracks = set.control && set.control.tracks;
    const Pads = tracks ? GroupList : ClipList;
    return (
      <div className="App">
        <div className="header">
          <a href={currentLink} alt="open">
            {currentLink}
          </a>
        </div>
        <Pads
          clips={set.clips}
          tracks={tracks}
          pressed={pressed}
          onPress={name => this.emit(true, name)}
          onRelease={name => this.emit(false, name)}
        />
      </div>
    );
  }
}

export default App;