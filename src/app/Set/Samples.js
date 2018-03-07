import React, { Component } from "react";
import Sample from "./Sample";

class Samples extends Component {
  constructor(props) {
    super(props);
    const { events } = props;
    this.state = {};
    events.on("start", name =>
      this.setState({
        [name]: true
      })
    );
    events.on("stop", name =>
      this.setState({
        [name]: false
      })
    );
  }
  render() {
    const { set } = this.props;
    console.log(this.state);
    const images = buildImageUrls(set);
    const keyboard = keyBindings(set.keyboard);
    return (
      <div className="Samples">
        {Object.keys(set.samples).map(name => (
          <Sample
            key={name}
            name={name}
            sample={set.samples[name]}
            keyboard={keyboard}
            images={images}
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
