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

const Group = ({ pressed, group, onPress, onRelease }) => (
  <div className="PadGroup">
    {group.clips.map(clip => (
      <Pad
        key={clip.id}
        name={clip.id}
        pressed={pressed[clip.id]}
        color={clip.display.color}
        image={clip.display.cover}
        onPress={onPress}
        onRelease={onRelease}
      />
    ))}
  </div>
);

const GroupedList = props => (
  <div className="GroupedList">
    {groups(props.clips).map(group => (
      <Group {...props} key={group.name} group={group} />
    ))}
  </div>
);

export default GroupedList;
