import React from "react";
import "./Draggable.css";
export default class Draggable extends React.Component {
  componentDidMount() {
    const coordinates = {
      top: this.draggableDiv.offsetTop,
      bottom: this.draggableDiv.offsetHeight + this.draggableDiv.offsetTop,
      left: this.draggableDiv.offsetLeft,
      right: this.draggableDiv.offsetWidth + this.draggableDiv.offsetLeft
    };
    if (this.props.updateOffset) {
      this.props.updateOffset(coordinates);
      this.setState({ boundingBox: coordinates });
    }
  }

  render() {
    // console.log(this.props);

    return (
      <div
        className="Draggable-base"
        ref={div => {
          this.draggableDiv = div;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
