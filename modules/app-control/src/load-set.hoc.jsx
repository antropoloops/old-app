import React from "react";
import Message from "./components/Message";
import keyboard from "@atpls/keyboard";
import Events from "nanobus";

export default function loadSetHoc(WrappedComponent) {
  class LoadSetComponent extends React.Component {
    constructor(props) {
      super(props);
      this.socket = props.socket;
      this.state = { set: null, events: null };
    }
    componentWillMount() {
      const { url, socket } = this.props;
      fetch(url + "sets/continentes.audioset.json")
        .then(response => response.json())
        .then(set => {
          const events = initSet(set, socket);
          this.setState({ set, events });
        });
    }

    render() {
      const { set, events } = this.state;
      return set ? (
        <WrappedComponent
          set={set}
          events={events}
          socket={this.socket}
          {...this.props}
        />
      ) : (
        <Message label="Loading antropoloops set..." />
      );
    }
  }

  return LoadSetComponent;
}

function initSet(set, socket) {
  const events = new Events();
  keyboard(set, events);
  return events;
}
