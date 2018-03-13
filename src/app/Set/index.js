import React from "react";
import Samples from "./Samples";
import { openFullScreen } from "../full-screen";

const SetMeta = ({ set }) => (
  <div className="meta">
    <h1>{set.data.title}</h1>
    <p>{set.data.description}</p>
  </div>
);

const Set = ({ set, onChangeSet }) => (
  <div className="Set">
    <button className="fullscreen" onClick={openFullScreen}>
      Poner a pantalla completa
    </button>
    <button onClick={onChangeSet}>Cambiar de set</button>
    <SetMeta set={set} />
    <Samples set={set} />
  </div>
);

export default Set;
