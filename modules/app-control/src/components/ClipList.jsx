import React from "react";
import Pad from "./Pad";
import { rgb } from "../color";

const mapValues = (object, cb) =>
  Object.keys(object).map((key, i) => cb(key, object[key], i));

const ClipList = ({ clips, pressed, onPress, onRelease }) => (
  <div className="ClipList pads">
    {mapValues(clips, (name, clip) => (
      <Pad
        key={name}
        name={name}
        keyboard={null}
        color={rgb(clip.display.color)}
        pressed={pressed[name]}
        onPress={onPress}
        onRelease={onRelease}
      />
    ))}
  </div>
);

export default ClipList;