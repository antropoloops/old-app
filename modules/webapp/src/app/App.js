import React, { Component } from "react";
import Set from "./Set";
import SelectSet from "./SelectSet";
import { openFullScreen } from "./full-screen";
import "./App.css";

const Loading = () => (
  <div>
    <h2>Loading...</h2>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.manager = props.manager;
    this.state = { select: true, current: null };
    this.manager.onCurrent(set =>
      this.setState({ select: false, current: set })
    );
  }

  onChangeSet = () => {
    if (this.state.current) this.state.current.unmount();
    window.location.hash = "";
    this.setState({ select: true });
  };

  render() {
    return <div className="App">{this.child()}</div>;
  }

  child() {
    const { current, select } = this.state;
    if (current && select === false) {
      return <Set set={current} onChangeSet={this.onChangeSet} />;
    } else {
      return <SelectSet manager={this.manager} />;
    }
  }
}

export default App;
