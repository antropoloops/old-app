import React, { Component } from "react";
import "./App.css";
import { openFullScreen } from "./full-screen";
import Samples from "./Samples";

const Set = ({ set, events }) => (
  <div className="Set">
    <h1>{set.title}</h1>
    <p>{set.description}</p>
    <button className="fullscreen" onClick={openFullScreen}>
      Full Screen
    </button>
    <Samples set={set} events={events} />
  </div>
);

class App extends Component {
  render() {
    const { set, events } = this.props;
    return (
      <div className="App">
        <Set set={set} events={events} />
      </div>
    );
  }
}

export default App;
