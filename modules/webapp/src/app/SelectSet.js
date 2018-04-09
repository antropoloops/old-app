import React, { Component } from "react";

const AudioSet = ({ title, onLoad }) => (
  <div>
    <button onClick={onLoad}>{title}</button>
  </div>
);

class SelectSet extends Component {
  constructor(props) {
    super(props);
    this.state = { list: null };
    this.manager = props.manager;
    this.manager
      .loadSetList()
      .then(list => {
        const current = window.location.hash.slice(1).toLowerCase();
        this.select(current, list[current]);
        return list;
      })
      .then(list => {
        this.setState({ list });
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
    const { list } = this.state;
    if (!list) return "Loading...";
    const names = Object.keys(list);
    return (
      <div className="SelectSet">
        <h1>Antropoloops</h1>
        <h2>Selecciona un set:</h2>
        {names.map(name => (
          <AudioSet
            key={name}
            title={list[name].title}
            onLoad={() => this.select(name, list[name])}
          />
        ))}
      </div>
    );
  }
}

export default SelectSet;
