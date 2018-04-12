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
        {Object.keys(data.samples).map(name => (
          <Sample
            key={name}
            name={name}
            sample={data.samples[name]}
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
  const ext = set.config.load.imageFileExt;
  return Object.keys(set.samples).reduce((images, name) => {
    images[name] = set.url + name + ext;
    return images;
  }, {});
}

function keyBindings(keyboard) {
  return Object.keys(keyboard).reduce((bindings, key) => {
    const trigger = keyboard[key];
    bindings[trigger.sample] = key;
    return bindings;
  }, {});
}

export default Samples;
