import React from "react";
import { loadAudioSet, getEvents } from "@atpls/audioset";
import initKeyboard from "@atpls/keyboard";
import Message from "./components/Message";

export default function loadSetHoc(WrappedComponent) {
  class LoadSetComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { set: null, events: null };
    }
    componentWillMount() {
      const { url, socket } = this.props;
      const setName = window.location.hash.slice(1).toLowerCase() || "lik03";
      loadAudioSet(setName, url + "sets/").then(set => {
        const events = getEvents(set, socket);
        initKeyboard(set, events);
        this.setState({ set, events });
      });
    }

    render() {
      const { set, events } = this.state;
      return set ? (
        <WrappedComponent set={set} events={events} {...this.props} />
      ) : (
        <Message label="Loading antropoloops set..." />
      );
    }
  }

  return LoadSetComponent;
}
