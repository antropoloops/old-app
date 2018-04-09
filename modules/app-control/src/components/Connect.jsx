import React from "react";
import { withState } from "recompose";
import "./Connect.css";

const base = () => {
  const origin = window.origin || "http://127.0.0.1:3333";
  const portIndex = origin.lastIndexOf(":");
  return (portIndex === -1 ? origin : origin.slice(0, portIndex)) + ":3333";
};

const enhance = withState("url", "setUrl", base());

const Connect = ({ url, setUrl, onConnect }) => (
  <div className="Connect">
    <form
      onSubmit={e => {
        e.preventDefault();
        onConnect(url);
      }}
    >
      <label>Couldn't connect to default server. Write the url here:</label>
      <input
        type="text"
        value={url}
        onChange={setUrl}
        placeholder="server url"
      />
      <input type="submit" value="Connect" />
    </form>
  </div>
);

export default enhance(Connect);
