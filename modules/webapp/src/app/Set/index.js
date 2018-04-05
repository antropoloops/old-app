import React, { Component } from "react";
import Samples from "./Samples";
import { openFullScreen } from "../full-screen";

const SetMeta = ({ set }) => (
  <div className="meta">
    <h1>{set.data.title}</h1>
    <p>{set.data.description}</p>
  </div>
);

class Set extends Component {
  constructor(props) {
    super(props);
    this.state = { minified: true };
  }
  toggleState = () => this.setState({ minified: !this.state.minified });

  render() {
    const { set, onChangeSet } = this.props;
    return this.state.minified ? (
      <div className="Set minified">
        <button className="fullscreen" onClick={openFullScreen}>
          F
        </button>
        <button onClick={this.toggleState}>></button>
      </div>
    ) : (
      <div className="Set">
        <button className="fullscreen" onClick={openFullScreen}>
          Poner a pantalla completa
        </button>
        <button onClick={this.toggleState}>x</button>
        <button onClick={onChangeSet}>Cambiar de set</button>
        <SetMeta set={set} />
        <Samples set={set} />
      </div>
    );
  }
}

export default Set;
