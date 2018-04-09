import React from "react";
export default function withDragDrop(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        boardCoordinates: {},
        mouseCoordinates: {},
        draggedCoordinates: {},
        dropCoordinates: {},
        dragging: false
      };
    }
    handleMouseMove(event) {
      const mouseCoordinates = { x: event.page.X, y: event.page.Y };
      this.setState({ mouseCoordinates });
    }
    handleMouseLeave() {
      this.setState({ mouseCoordinates: {} });
      this.setState({ draggedCoordinates: {} });
      this.setState({ dragging: false });
    }
    handleMouseDown(event) {
      this.setState({ dragging: true });
      const mouseCoordinates = { x: event.pageX, y: event.pageY };
      this.setState({
        draggedCoordinates: mouseCoordinates,
        dropCoordinates: {}
      });
    }
    handleMouseUp() {
      this.setState({ dragging: false });
      this.setState({
        draggedCoordinates: {},
        dropCoordinates: this.state.mouseCoordinates
      });
    }
    render() {
      return (
        <Component
          onMouseMove={e => this.handleMouseMove(e)}
          onMouseLeave={() => this.handleMouseLeave()}
          onMouseDown={e => this.handleMouseDown(e)}
          onMouseUp={() => this.handleMouseUp()}
          {...this.props}
          mouseCoordinates={this.state.mouseCoordinates}
          draggedCoordinates={this.state.draggedCoordinates}
          dropCoordinates={this.state.dropCoordinates}
          dragging={this.state.dragging}
        >
          {this.props.children}
        </Component>
      );
    }
  };
}
