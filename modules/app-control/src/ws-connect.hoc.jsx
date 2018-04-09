import React from "react";
import io from "socket.io-client";
import Message from "./components/Message";
import Connect from "./components/Connect";

// try to get a valid server url
const serverUrl = () => {
  const origin = window.origin || "http://127.0.0.1:3333";
  const portIndex = origin.lastIndexOf(":");
  return (portIndex === -1 ? origin : origin.slice(0, portIndex)) + ":3333";
};

const loadStatus = url =>
  fetch(url)
    .then(response => response.json())
    .then(status => {
      console.log("Status loaded!", status);
      const url = status.address;
      const socket = io(url);
      return { url, socket };
    });

/**
 * A HighOrderComponent to connect via web sockets
 */
export default function wsConnectHoc(WrappedComponent) {
  class ConnectComponet extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, socket: null, url: null };
    }
    componentWillMount() {
      const url = serverUrl() + "/status";
      loadStatus(url)
        .then(this.setState.bind(this))
        .catch(error => {
          this.setState({ error });
        });
    }
    render() {
      if (this.state.error) {
        return (
          <Connect
            onConnect={baseUrl => {
              this.setState({ error: undefined });
              const url = baseUrl + "/status";
              console.log("loading", url);
              loadStatus(url).then(state => this.setState(state));
            }}
          />
        );
      } else if (!this.state.socket) {
        return <Message label="Connecting..." />;
      } else {
        return (
          <WrappedComponent
            url={this.state.url}
            socket={this.state.socket}
            {...this.props}
          />
        );
      }
    }
  }

  return ConnectComponet;
}
