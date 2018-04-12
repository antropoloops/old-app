import React, { Component } from "react";
import Sample from "./Sample";

class Samples extends Component {
  constructor(props) {
    super(props);
    const { set } = props;
    this.state = {};
    set.on("start", name =>
      this.setState({
        [name]: true
      })
    );
    set.on("stop", name =>
      this.setState({
        [name]: false
      })
    );
  }
  render() {
    const { data } = this.props.set;
    const images = buildImageUrls(data);
    const keyMap = keyBindings(data.keyboard.keyMap);
    return (
      <div className="Samples">
        {Object.keys(data.clips).map(name => (
          <Sample
            key={name}
            name={name}
            clip={data.clips[name]}
            keyboard={keyMap}
            image={images[name]}
            isRunning={this.state[name]}
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

export default Samples;
