import React from "react";
import Samples from "./Samples";

const Set = ({ set, events }) => (
  <div className="Set">
    <h1>{set.title}</h1>
    <p>{set.description}</p>
    <Samples set={set} events={events} />
  </div>
);

export default Set;
