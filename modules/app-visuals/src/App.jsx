import React from "react";
import { openFullScreen } from "./fullscreen";
import Icon, { ICONS } from "./icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mute: false };
    this.toggleMute = this.toggleMute.bind(this);
    this.stopAll = this.stopAll.bind(this);
  }
  toggleMute() {
    this.state.mute = !this.state.mute;
    this.setState(this.state);
  }
  stopAll() {
    this.props.events.emit("/clip/stop-all");
    this.setState({ ...this.state, runninge: false });
  }
  render() {
    const { mute } = this.state;
    const { title, description } = this.props.set.meta;
    return (
      <div className="App">
        <div className="body">
          {title}: {description}
        </div>
        <Icon alt="stop" icon={ICONS.stop} onClick={() => this.stopAll()} />
        <Icon
          alt="stop"
          icon={mute ? ICONS.volumeOff : ICONS.volumeUp}
          onClick={() => this.toggleMute()}
        />
        {this.props.hasKeyboard && <Icon alt="stop" icon={ICONS.keyboard} />}
        <Icon alt="stop" icon={ICONS.fullscreen} onClick={openFullScreen} />
      </div>
    );
  }
}

export default App;
