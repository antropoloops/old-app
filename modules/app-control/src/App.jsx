import React from "react";
import ClipList from "./components/ClipList";
import GroupedList from "./components/GroupedList";
import "./App.css";

// get clip name from a set
// given a url with port, change the port to the one from current window
const withCurrentPort = url => {
  const base = url.slice(0, url.lastIndexOf(":"));
  const port = window.origin.slice(window.origin.lastIndexOf(":") + 1);
  return base + ":" + port;
};

const asPressed = names =>
  names.reduce((pressed, name) => {
    pressed[name] = true;
    return pressed;
  }, {});

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
    events.on("/audio/query-results/playing", names =>
      this.setState({ pressed: asPressed(names) })
    );
    events.emit("/audio/query/playing");
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
    const groups = set.control && set.control.groups;
    const Pads = groups ? GroupedList : ClipList;
    return (
      <div className="App">
        <div className="header" />
        <Pads
          clips={set.clips}
          groups={groups}
          pressed={pressed}
          onPress={name => this.emit(true, name)}
          onRelease={name => this.emit(false, name)}
        />
      </div>
    );
  }
}

export default App;
