import React from "react";

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.touched = false;
  }

  handlePress(isTouch) {
    // prevent double click on mobile (https://github.com/facebook/react/issues/9809)
    if (isTouch) {
      this.touched = true;
    } else if (this.touched === true) {
      this.touched = false;
      return;
    }
    const pressed = !this.props.pressed;
    this.props[pressed ? "onPress" : "onRelease"]();
  }

  render() {
    const { color, pressed } = this.props;
    return (
      <button
        className="Pad"
        style={{
          borderColor: color,
          backgroundColor: pressed ? color : "transparent"
        }}
        onTouchStart={() => this.handlePress(true)}
        onMouseDown={() => this.handlePress(false)}
      >
        &nbsp;
      </button>
    );
  }
}

export default Pad;
