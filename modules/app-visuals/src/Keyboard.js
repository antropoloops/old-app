import React from "react";
import { values } from "lodash";
import "./Keyboard.css";

const Trigger = ({ name, active, color, onClick }) => (
  <button
    className="trigger"
    style={{
      borderColor: color,
      backgroundColor: active ? color : "transparent"
    }}
    onClick={() => onClick(name)}
  >
    &nbsp;
  </button>
);

class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggle = this.toggle.bind(this);
    props.events.on("/audio/started", name => this.setActve(true, name));
    props.events.on("/audio/stopped", name => this.setActve(false, name));
  }

  setActve(isActive, name) {
    const newState = Object.assign(this.state);
    newState[name] = isActive;
    this.setState(newState);
  }

  toggle(name) {
    const { events } = this.props;
    const selected = this.state[name];
    if (!selected) {
      events.emit("/clip/start", name);
    } else {
      events.emit("/clip/stop", name);
    }
  }

  render() {
    return (
      <div className="Keyboard">
        {values(this.props.clips).map(clip => (
          <Trigger
            active={this.state[clip.id]}
            key={clip.id}
            name={clip.id}
            color={clip.display.color}
            onClick={this.toggle}
          />
        ))}
      </div>
    );
  }
}

export default Keyboard;
