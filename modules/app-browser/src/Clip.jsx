import React from "react";
import cc from "classcat";

const Clip = ({ name, clip, keyboardKey, image, isRunning }) => (
  <div className={cc(["Clip", isRunning ? "running" : "stopped"])}>
    <img src={image} alt="album cover" />
    <div className="key" style={{ backgroundColor: clip.display.color }}>
      {keyboardKey}
    </div>
    <div className="title">{clip.meta.title}</div>
    <div className="country">{clip.meta.country}</div>
  </div>
);

export default Clip;
