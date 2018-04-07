import React from "react";
import Message from "./components/Message";
import initKeyboard from "@atpls/keyboard";
import Events from "tiny-emitter";

export default function loadSetHoc(WrappedComponent) {
  class LoadSetComponent extends React.Component {
    constructor(props) {
      super(props);
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
      const { set } = this.state;
      const { socket } = this.props;
      return set ? (
        <WrappedComponent set={set} socket={socket} {...this.props} />
      ) : (
        <Message label="Loading antropoloops set..." />
      );
    }
  }

  return LoadSetComponent;
}

function initSet(set, socket) {
  const events = new Events();
  initKeyboard(set, events);
  events.on("start", name => {
    console.log("start", name);
    socket.send("/sample/start", name);
  });
  events.on("stop", name => {
    console.log("stop", name);
    socket.send("/sample/stop", name);
  });
  return events;
}
