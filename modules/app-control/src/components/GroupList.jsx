import React from "react";
import Pad, { EmptyPad } from "./Pad";
import { mapObject } from "@atpls/audioset";
import { rgb } from "../color";

const EMPTY = [0, 1, 2, 3, 4, 5, 6, 7];

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.selectGroup = this.selectGroup.bind(this);
  }
  selectGroup(name) {
    this.setState({ selected: name });
  }
  render() {
    const { tracks, clips } = this.props;
    const current = tracks[this.state.selected];
    if (current) {
      return (
        <ClipPads
          group={current}
          {...this.props}
          onBack={() => this.selectGroup()}
        />
      );
    } else {
      return <GroupPads {...this.props} onPress={this.selectGroup} />;
    }
  }
}

const groupClips = (group, clips) => group.clips.map(name => clips[name]);

const join = (pos, group, clips) =>
  EMPTY.map(i => {
    if (i < pos && i < clips.length) return clips[i];
    else if (i === pos) return group;
    else if (i > pos && i <= clips.length) return clips[i - 1];
    else return <EmptyPad key={i} />;
  });

const ClipPads = ({ group, clips, pressed, onPress, onRelease, onBack }) => (
  <div className="ClipList pads">
    {join(
      group.pos,
      <Pad key="group" pressed={true} color="#CCC" onRelease={onBack} />,
      groupClips(group, clips).map(clip => (
        <Pad
          key={clip.id}
          name={clip.id}
          keyboard={null}
          color={rgb(clip.display.color)}
          pressed={pressed[clip.id]}
          onPress={onPress}
          onRelease={onRelease}
        />
      ))
    )}
  </div>
);

const GroupPads = ({ tracks, onPress }) => (
  <div className="ClipGroup pads">
    {mapObject(tracks, (track, name, i) => (
      <Pad key={name} name={name} color="#ccc" onPress={onPress} />
    ))}
  </div>
);

export default GroupList;
