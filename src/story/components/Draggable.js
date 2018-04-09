import React from "react";
import classNames from "classnames";
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
    var offSetClass = classNames("Draggable-content", {
      "Draggable-left":
        this.props.dropLeft && !this.props.dragged && this.props.draggedOver,
      "Draggable-top":
        this.props.dropTop && !this.props.dragged && this.props.draggedOver,
      "Draggable-bottom":
        this.props.dropBottom && !this.props.dragged && this.props.draggedOver,
      "Draggable-right":
        this.props.dropRight && !this.props.dragged && this.props.draggedOver
    });

    return (
      <div
        className={this.props.dragged ? "Draggable-fade" : "Draggable-base"}
        ref={div => {
          this.draggableDiv = div;
        }}
      >
        <div className={offSetClass}>{this.props.children}</div>
      </div>
    );
  }
}
