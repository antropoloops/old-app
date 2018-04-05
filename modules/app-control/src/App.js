import React, { Component } from "react";
import initKeyboard from "@antpls/keyboard";
import "./App.css";

const URL = "http://localhost:3333/data/audiosets/continentes.audioset.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = props.socket;
    this.state = null;
  }
  componentDidMount() {
    fetch(URL)
      .then(response => response.json())
      .then(set => this.setAudioset(set));
  }

  setAudioset(set) {
    const socket = this.socket;
    const prefix = "@" + set.title.toLowerCase() + "/";
    const events = {
      emit(event, name) {
        const newEvent = "/audio/" + event;
        const fullName = prefix + name;
        socket.send(newEvent, fullName);
        console.log("EMIT", newEvent, fullName);
      }
    };
    initKeyboard(set, events);
    this.setState(set);
  }
  render() {
    const set = this.state;
    if (!set) return <h1>Loading...</h1>;
    console.log("set", set);
    return (
      <div className="App">
        <h1>{set.title}</h1>
      </div>
    );
  }
}

export default App;
