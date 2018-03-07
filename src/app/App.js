import React, { Component } from "react";
import Set from "./Set";
import { openFullScreen } from "./full-screen";
import "./App.css";

const Header = () => (
  <header>
    <button className="fullscreen" onClick={openFullScreen}>
      Full Screen
    </button>
  </header>
);

class App extends Component {
  render() {
    const { set, events } = this.props;
    return (
      <div className="App">
        <Header />
        <Set set={set} events={events} />
      </div>
    );
  }
}

export default App;
