import React from "react";
import Draggable from "./Draggable";
import withDragDrop from "../../hoc/withDragDrop";
import "./Story.css";
const data = [
  { colour: "#111", in: 0 },
  { colour: "#333", in: 1 },
  { colour: "#555", in: 2 },
  { colour: "#777", in: 3 },
  { colour: "#999", in: 4 },
  { colour: "#bbb", in: 5 },
  { colour: "#333", in: 6 },
  { colour: "#555", in: 7 },
  { colour: "#777", in: 8 },
  { colour: "#999", in: 9 },
  { colour: "#bbb", in: 10 }
];
const EDGE = 50;
const Story = class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardCoordinates: {},
      mouseCoordinates: {},
      dragging: false,
      data: data,
      currentDragged: null,
      draggedIndex: null,
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
    let temp = this.state.data[pos1];
    data[pos1] = this.state.data[pos2];
    data[pos2] = temp;
    this.setState({ data, draggedIndex: null });
  }
  handleMouseDown(e) {
    this.props.onMouseDown(e);
    this.offsets.forEach((offset, i) => {
      if (
        this.props.mouseCoordinates.x > offset.left &&
        this.props.mouseCoordinates.x < offset.right &&
        this.props.mouseCoordinates.y > offset.top &&
        this.props.mouseCoordinates.y < offset.bottom
      ) {
        if (this.state.draggedIndex !== i) this.setState({ draggedIndex: i });
        else this.setState({ draggedIndex: null });
      }
    });
  }
  handleMouseUp() {
    this.props.onMouseUp();
    this.offsets.forEach((offset, i) => {
      if (
        this.props.mouseCoordinates.x > offset.left &&
        this.props.mouseCoordinates.x < offset.right &&
        this.props.mouseCoordinates.y > offset.top &&
        this.props.mouseCoordinates.y < offset.bottom
      ) {
        this.swapPositions(i, this.state.draggedIndex);
      } else {
        this.setState({ draggedIndex: null });
      }
    });
    console.log(this.state.data);
  }

  render() {
    //console.log(this.props.mouseCoordinates);
    let data = this.state.data;
    let dropIndex = null;
    let left = false;
    let right = false;
    let top = false;
    let bottom = false;
    let swap = false;
    let draggedOver = null;
    if (this.props.dragging) {
      this.offsets.forEach((offset, i) => {
        if (
          this.props.mouseCoordinates.x > offset.left &&
          this.props.mouseCoordinates.x < offset.right &&
          this.props.mouseCoordinates.y > offset.top &&
          this.props.mouseCoordinates.y < offset.bottom
        ) {
          console.log(`Over:${i}`);

          draggedOver = i;
          // data[i] = this.state.data[i === 0 ? 1 : 0];
          // data[i === 0 ? 1 : 0] = this.state.data[i];
          if (
            this.props.mouseCoordinates.x > offset.left &&
            this.props.mouseCoordinates.x < offset.left + EDGE
          ) {
            console.log("left edge");
            left = true;
            right = false;
            top = false;
            bottom = false;
          } else if (
            this.props.mouseCoordinates.x > offset.right - EDGE &&
            this.props.mouseCoordinates.x < offset.right
          ) {
            console.log("right edge");
            right = true;
            left = false;
            top = false;
            bottom = false;
          } else if (
            this.props.mouseCoordinates.y > offset.top &&
            this.props.mouseCoordinates.y < offset.top + EDGE
          ) {
            top = true;
            left = false;
            right = false;
            bottom = false;
          } else if (
            this.props.mouseCoordinates.y > offset.bottom - EDGE &&
            this.props.mouseCoordinates.y < offset.bottom
          ) {
            bottom = true;
            left = false;
            right = false;
            top = false;

            console.log("bottom edge");
          }
          // else {
          //   console.log("swap");
          //   left = false;
          //   right = false;
          //   top = false;
          //   bottom = false;
          //   swap = true;
          // }
        }
      });
    } else {
      dropIndex = null;
    }

    return (
      <div
        className="Story-base"
        ref={div => {
          this.storyDiv = div;
        }}
        onMouseMove={e => this.props.onMouseMove(e)}
        onMouseLeave={() => this.props.onMouseLeave()}
        onMouseDown={e => this.handleMouseDown(e)}
        onMouseUp={() => this.handleMouseUp()}
      >
        {this.state.data.map((data, i) => {
          return (
            <Draggable
              index={i}
              key={i}
              updateOffset={offset => this.updateOffset(offset)}
              mouseCoordinates={this.props.mouseCoordinates}
              dragging={this.props.dragging}
              dropLeft={left}
              dropTop={top}
              dropRight={right}
              dropBottom={bottom}
              // getDraggedItem={i => this.getDraggedItem(i)}
              dragged={i === this.state.draggedIndex}
              draggedOver={i === draggedOver}
              swapPositions={(val1, val2) => {
                this.swapPositions(val1, val2);
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 200,
                  backgroundColor: data.colour,
                  padding: 40
                }}
              >
                {data.in}
                {i === this.state.draggedIndex ? "Faded" : ""}
              </div>
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
