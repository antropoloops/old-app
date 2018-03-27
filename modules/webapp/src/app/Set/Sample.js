import React from "react";
import cc from "classcat";

const Sample = ({ name, sample, keyboard, images, isRunning }) => (
  <div className={cc(["Sample", isRunning ? "running" : "stopped"])}>
    <img src={images[name]} alt="album cover" />
    <div className="key">{keyboard[name]}</div>
    <div className="title">{sample.meta.title}</div>
    <div className="country">{sample.meta.country}</div>
  </div>
);

export default Sample;
