import React, { Component } from "react";
import ClipList from "./ClipList";

const SetMeta = ({ meta }) => (
  <div className="meta">
    <h1>{meta.title}</h1>
    <p>{meta.description}</p>
  </div>
);

const App = ({ set }) => (
  <div className="Set">
    <SetMeta meta={set.meta} />
    <ClipList set={set} />
  </div>
);

export default App;
