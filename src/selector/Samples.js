import React, { Component } from "react";
import "./App.css";
import cc from "classcat";

const Sample = ({ name, sample, keyboard, images, isRunning }) => (
  <div className={cc(["Sample", isRunning ? "running" : "stopped"])}>
    <img src={images[name]} alt="album cover" />
    <div className="key">{keyboard[name]}</div>
    <div className="title">{sample.meta.title}</div>
    <div className="country">{sample.meta.country}</div>
  </div>
);

class Samples extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    props.events.on("start", name =>
      this.setState({
        [name]: true
      })
    );
    props.events.on("stop", name =>
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
      <div className="samples">
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
