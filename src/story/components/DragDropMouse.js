import React from "react";
import ReactDOM from "react-dom";
const DragDropContext = React.createContext();
const DRAGGABLE_THRESHOLD = 30;
export default class DragDropMouse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseCoordinates: {},
            draggedCoordinates: {},
            dropCoordinates: {},
            dragging: false,
            getDraggable: this.getDraggable,
            draggables: [],
            stupidUpdater: false
        };
        this.draggables = [];
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this).onmousemove = event => {
            this.handleMouseMove(event);
        };
        ReactDOM.findDOMNode(this).onmouseleave = event => {
            this.handleMouseLeave(event);
        };
        ReactDOM.findDOMNode(this).onmousedown = event => {
            this.handleMouseDown(event);
        };
        ReactDOM.findDOMNode(this).onmouseup = event => {
            this.handleMouseUp(event);
        };
    }
    checkThreshold = (point, origin, end) => {
        if (point) {
            if (point < end && point > end - DRAGGABLE_THRESHOLD) {
                return "END";
            } else if (point > origin && point < origin + DRAGGABLE_THRESHOLD) {
                return "START";
            } else return false;
        }
    };
    checkIfInside = (point, origin, end) => {
        if (point) {
            if (point < end && point > origin) {
                return true;
            } else {
                return false;
            }
        }
    };
    pickUp = () => {
        // console.log(this.draggables);
        if (this.draggables && this.draggables.length > 0) {
            this.draggables.forEach((offset, i) => {
                if (
                    this.checkIfInside(
                        this.state.draggedCoordinates.x,
                        offset.xStart,
                        offset.xEnd
                    ) &&
                    this.checkIfInside(
                        this.state.draggedCoordinates.y,
                        offset.yStart,
                        offset.yEnd
                    )
                ) {
                    // console.log("pickup", i);
                    if (this.props.onPick) {
                        this.props.onPick(i);
                    }
                }
            });
        }
    };
    drop = () => {
        if (this.draggables && this.draggables.length > 0) {
            this.draggables.forEach((offset, i) => {
                // console.log(offset);
                if (
                    this.checkIfInside(
                        this.state.dropCoordinates.x,
                        offset.xStart,
                        offset.xEnd
                    ) &&
                    this.checkIfInside(
                        this.state.dropCoordinates.y,
                        offset.yStart,
                        offset.yEnd
                    )
                ) {
                    if (this.props.onDrop) {
                        if (
                            this.checkThreshold(
                                this.state.dropCoordinates.x,
                                offset.xStart,
                                offset.xEnd
                            )
                        ) {
                            this.props.onDrop(
                                i,
                                this.checkThreshold(
                                    this.state.dropCoordinates.x,
                                    offset.xStart,
                                    offset.xEnd
                                ),
                                "X"
                            );
                        } else if (
                            this.checkThreshold(
                                this.state.dropCoordinates.y,
                                offset.yStart,
                                offset.yEnd
                            )
                        ) {
                            this.props.onDrop(
                                i,
                                this.checkThreshold(
                                    this.state.dropCoordinates.y,
                                    offset.yStart,
                                    offset.yEnd
                                ),
                                "Y"
                            );
                        } else {
                            this.props.onDrop(i, "INSIDE");
                        }
                    }
                }
            });
        }
    };
    handleMouseMove(event) {
        if (this.state.dragging) {
            const mouseCoordinates = { x: event.pageX, y: event.pageY };
            this.setState({ mouseCoordinates }, () => {
                if (this.props.dragging && this.props.onDrag) {
                    this.props.onDrag(this.state.mouseCoordinates);
                }
            });
        }
    }
    handleMouseLeave() {
        this.setState({
            mouseCoordinates: {},
            draggedCoordinates: {},
            dropCoordinates: {},
            dragging: false
        });
    }
    handleMouseDown(event) {
        const mouseCoordinates = { x: event.pageX, y: event.pageY };
        this.setState(
            {
                draggedCoordinates: mouseCoordinates,
                dropCoordinates: {},
                dragging: true
            },
            () => {
                this.pickUp();
            }
        );
    }
    handleMouseUp() {
        this.setState(
            {
                draggedCoordinates: {},
                dropCoordinates: this.state.mouseCoordinates
            },
            () => {
                this.drop();
                this.setState({ dragging: false });
            }
        );
    }
    getDraggable = (val, i) => {
        if ((i && i !== undefined) || i === 0) {
            this.draggables[i] = val;
            // this.setState(prevState => {
            //     stupidUpdater: !prevState.stupidUpdater;
            // });
            //  this.setState({ draggables: this.draggables });
        }

        // this.draggables[i] = val;
    };
    render() {
        return (
            <React.Fragment>
                <DragDropContext.Provider
                    value={this.getDraggable}
                    stupidUpdater={this.state.stupidUpdater}
                >
                    {this.props.render(this.state)}
                </DragDropContext.Provider>
                <div>
                    {" "}
                    {this.draggables.map(val => {
                        return (
                            <div
                                style={{
                                    pointerEvents: "none",
                                    width: val.xEnd - val.xStart,
                                    height: val.yEnd - val.yStart,
                                    position: "absolute",
                                    left: val.xStart,
                                    top: val.yStart,
                                    border: "3px solid red"
                                }}
                            />
                        );
                    })}{" "}
                </div>
            </React.Fragment>
        );
    }
}

class PositionUpdater extends React.Component {
    componentDidMount() {
        if (
            this.props.update &&
            this.props.box &&
            !Object.keys(this.props.box).length === 0 &&
            !this.props.box.constructor === Object
        ) {
            console.log(this.props.index);
            this.props.update(this.props.box, this.props.index);
        }
    }
    componentDidUpdate() {
        this.props.update(this.props.box, this.props.index);
    }
    // componentWillReceiveProps(nextProps) {
    //     if (this.props.box !== nextProps.box) {
    //         this.props.update(this.props.box, this.props.index);
    //     }
    // }
    // componentDidUpdate() {
    //     this.props.update(this.props.box, this.props.index);
    // }
    render() {
        return <React.Fragment>{this.props.children}</React.Fragment>;
    }
}
export class Draggable extends React.Component {
    constructor(props) {
        super(props);
        this.element = React.createRef();
        this.box = {};
    }
    updatePosition = () => {
        const scrollAmount = window.scrollY;
        const topOffset =
            this.element.getBoundingClientRect().top + scrollAmount;
        const leftOffset = this.element.getBoundingClientRect().left;
        const rightOffset = this.element.getBoundingClientRect().right;
        const bottomOffset =
            this.element.getBoundingClientRect().bottom + scrollAmount;

        this.box = Object.assign({
            xStart: leftOffset,
            yStart: topOffset,
            xEnd: rightOffset,
            yEnd: bottomOffset
        });
    };
    componentDidMount() {
        this.updatePosition();
    }
    componentDidUpdate() {
        this.updatePosition();
    }

    extendChildren = context => {
        const childrenWithContext = React.Children.only(
            this.props.children(context)
        );

        return React.cloneElement(childrenWithContext, {
            index: this.props.index,

            ref: val => {
                return (this.element = ReactDOM.findDOMNode(val));
            }

            //  ref: this.element
            //ref: forwardedRef
        });
    };
    render() {
        // render;

        //console.log(this.extendChildren());
        return (
            <DragDropContext.Consumer>
                {context => (
                    <PositionUpdater
                        update={context}
                        box={this.box}
                        index={this.props.index}
                    >
                        {this.extendChildren(context)}
                    </PositionUpdater>
                )}
            </DragDropContext.Consumer>
        );
    }
}
/* onMouseMove={e => this.handleMouseMove(e)}
                onMouseLeave={() => this.handleMouseLeave()}
                onMouseDown={e => this.handleMouseDown(e)}
                onMouseUp={() => this.handleMouseUp()}
                {...this.props}
                mouseCoordinates={this.state.mouseCoordinates}
                draggedCoordinates={this.state.draggedCoordinates}
                dropCoordinates={this.state.dropCoordinates}
                dragging={this.state.dragging}

                */

//    React.Children.only(() => (
//     <React.Fragment>{this.props.children(context)}</React.Fragment>
// )
