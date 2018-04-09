import React from "react";
import cc from "classcat";

const Sample = ({ name, sample, keyboard, image, isRunning }) => (
  <div className={cc(["Sample", isRunning ? "running" : "stopped"])}>
    <img src={image} alt="album cover" />
    <div className="key" style={{ backgroundColor: sample.meta.color }}>
      {keyboard[name]}
    </div>
    <div className="title">{sample.meta.title}</div>
    <div className="country">{sample.meta.country}</div>
  </div>
);

export default Sample;
