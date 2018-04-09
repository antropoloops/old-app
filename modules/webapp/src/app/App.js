import React, { Component } from "react";
import Browser from "./Browser";
import SelectSet from "./SelectSet";
import "./App.css";
import { convertColors } from "./color";

class App extends Component {
  constructor(props) {
    super(props);
    this.manager = props.manager;
    this.state = { select: true, current: null };
    this.manager.onCurrent(set => {
      convertColors(set.data);
      this.setState({ select: false, current: set });
    });
  }

  onChangeBrowser = () => {
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
      return <Browser set={current} onChangeBrowser={this.onChangeBrowser} />;
    } else {
      return <SelectSet manager={this.manager} />;
    }
  }
}

export default App;
