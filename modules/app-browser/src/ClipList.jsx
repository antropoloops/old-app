import React, { Component } from "react";
import Clip from "./Clip";

class ClipList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { set } = this.props;
    const images = buildImageUrls(set);
    const keyMap = keyBindings(set.keyboard ? set.keyboard.keyMap : {});
    return (
      <div className="Clips">
        {Object.keys(set.clips).map(name => (
          <Clip
            key={name}
            name={name}
            clip={set.clips[name]}
            keyboard={keyMap[name]}
            image={images[name]}
          />
        ))}
      </div>
    );
  }
}

function buildImageUrls(set) {
  const urls = set.loader.sources.covers;
  return Object.keys(set.clips).reduce((images, name) => {
    images[name] = urls ? urls[0].replace("{{filename}}", name) : "";
    return images;
  }, {});
}

function keyBindings(keyboard) {
  return Object.keys(keyboard).reduce((bindings, key) => {
    const trigger = keyboard[key];
    bindings[trigger.clip] = key;
    return bindings;
  }, {});
}

export default ClipList;
