import React from "react";
import { initConnection, serverUrl } from "@atpls/audioset";
import Message from "./components/Message";
import Connect from "./components/Connect";

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
      initConnection(window.origin)
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
              initConnection(baseUrl).then(state => this.setState(state));
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
