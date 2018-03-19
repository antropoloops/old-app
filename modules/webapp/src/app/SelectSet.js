import React, { Component } from "react";

const INDEX_URL = "audioset.index.json";

const AudioSet = ({ title, onLoad }) => (
  <div>
    <button onClick={onLoad}>{title}</button>
  </div>
);

class SelectSet extends Component {
  constructor(props) {
    super(props);
    this.state = { index: null };
    this.manager = props.manager;
    console.log("new select!");
    fetch(INDEX_URL)
      .then(response => response.json())
      .then(index => {
        const current = window.location.hash.slice(1).toLowerCase();
        this.select(current, index[current]);
        return index;
      })
      .then(index => {
        this.setState({ index });
      });
  }

  select(name, setIndex) {
    if (setIndex) {
      window.location.hash = name;
      this.manager
        .loadSet(setIndex.url)
        .then(set => this.manager.setCurrent(set));
    }
  }

  render() {
    const { index } = this.state;
    if (!index) return "Loading...";
    const names = Object.keys(index);
    return (
      <div className="SelectSet">
        <h1>Antropoloops</h1>
        <h2>Selecciona un set:</h2>
        {names.map(name => (
          <AudioSet
            key={name}
            title={index[name].title}
            onLoad={() => this.select(name, index[name])}
          />
        ))}
      </div>
    );
  }
}

export default SelectSet;
