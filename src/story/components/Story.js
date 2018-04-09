import React from "react";
import Draggable from "./Draggable";
import withDragDrop from "../../hoc/withDragDrop";
import "./Story.css";
const data = [{ colour: "#666" }, { colour: "#999" }];
const Story = class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardCoordinates: {},
      mouseCoordinates: {},
      dragging: false,
      data: data,
      currentDragged: null,
      onDragElement: null,
      onDropElement: null
    };
    this.offsets = [];
  }
  updateOffset(offset) {
    this.offsets.push(offset);
  }
  componentDidMount() {
    const boardCoordinates = {
      top: this.storyDiv.offsetTop,
      bottom: this.storyDiv.offsetHeight + this.storyDiv.offsetTop,
      left: this.storyDiv.offsetLeft,
      right: this.storyDiv.offsetWidth + this.storyDiv.offsetLeft
    };
    this.setState({ boardCoordinates });
  }
  getDraggedItem(i) {
    console.log(i);
    this.setState({ currentDragged: i });
  }
  swapPositions(pos1, pos2) {
    let data = this.state.data;
    data[pos1] = this.state.data[pos2];
    data[pos2] = this.state.data[pos1];
    return data;
  }
  render() {
    console.log(this.props.mouseCoordinates);
    let data = this.state.data;
    if (this.props.dragging) {
      this.offsets.forEach((offset, i) => {
        if (
          this.props.mouseCoordinates.x > offset.left &&
          this.props.mouseCoordinates.x < offset.right &&
          this.props.mouseCoordinates.y > offset.top &&
          this.props.mouseCoordinates.y < offset.bottom
        ) {
          console.log(`Over:${i}`);
          data[i] = this.state.data[i === 0 ? 1 : 0];
          data[i === 0 ? 1 : 0] = this.state.data[i];
        }
      });
    }

    return (
      <div
        className="Story-base"
        ref={div => {
          this.storyDiv = div;
        }}
        onMouseMove={e => this.props.onMouseMove(e)}
        onMouseLeave={() => this.props.onMouseLeave()}
        onMouseDown={e => this.props.onMouseDown(e)}
        onMouseUp={() => this.props.onMouseUp()}
      >
        {data.map((data, i) => {
          return (
            <Draggable
              index={i}
              updateOffset={offset => this.updateOffset(offset)}
              mouseCoordinates={this.props.mouseCoordinates}
              dragging={this.props.dragging}
              // getDraggedItem={i => this.getDraggedItem(i)}
              swapPositions={(val1, val2) => {
                this.swapPositions(val1, val2);
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 200,
                  backgroundColor: data.colour
                }}
              />
            </Draggable>
          );
        })}
      </div>
    );
  }
};

export default withDragDrop(Story);

{
  /* <div className="Story-draggable">
          x:{this.props.draggedCoordinates.x} y:{
            this.props.draggedCoordinates.y
          }
        </div>
        <div className="Story-draggable">
          x:{this.props.mouseCoordinates.x} y:{this.props.mouseCoordinates.y}
        </div>
        <div className="Story-draggable">
          x:{this.props.dropCoordinates.x} y:{this.props.dropCoordinates.y}
        </div> */
}
