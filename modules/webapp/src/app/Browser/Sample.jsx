import React from "react";
import cc from "classcat";

const Sample = ({ name, clip, keyboard, image, isRunning }) => (
  <div className={cc(["Sample", isRunning ? "running" : "stopped"])}>
    <img src={image} alt="album cover" />
    <div className="key" style={{ backgroundColor: clip.display.color }}>
      {keyboard[name]}
    </div>
    <div className="title">{clip.meta.title}</div>
    <div className="country">{clip.meta.country}</div>
  </div>
);

export default Sample;
