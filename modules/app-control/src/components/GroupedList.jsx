import React from "react";
import { values } from "lodash";
import "./GroupedList.css";
import Pad from "./Pad";

const sortedGroups = groups =>
  Object.keys(groups)
    .sort()
    .map(name => ({
      name,
      clips: groups[name]
    }));

const groups = clips =>
  sortedGroups(
    values(clips).reduce((groups, clip) => {
      const name = clip.audio.track;
      groups[name] = groups[name] || [];
      groups[name].push(clip);
      return groups;
    }, {})
  );

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.current = null;
    this.onPress = this.onPress.bind(this);
    this.onRelease = this.onRelease.bind(this);
  }

  onPress(name) {
    const { onPress, onRelease } = this.props;

    if (this.current) onRelease(this.current);
    onPress(name);
    this.current = name;
  }

  onRelease(name) {
    this.props.onRelease(name);
    this.current = null;
  }

  render() {
    const { group, pressed } = this.props;
    return (
      <div className="PadGroup">
        {group.clips.map(clip => (
          <Pad
            key={clip.id}
            name={clip.id}
            pressed={pressed[clip.id]}
            color={clip.display.color}
            image={clip.display.cover}
            onPress={this.onPress}
            onRelease={this.onRelease}
          />
        ))}
      </div>
    );
  }
}

const GroupedList = props => (
  <div className="GroupedList">
    {groups(props.clips).map(group => (
      <Group {...props} key={group.name} group={group} />
    ))}
  </div>
);

export default GroupedList;
