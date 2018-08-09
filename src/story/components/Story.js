import React from "react";
import ReactDOM from "react-dom";
import DragDropMouse from "./DragDropMouse";
import { Draggable } from "./DragDropMouse";
import ForcedLayout from "./ForcedLayout";
import { Image } from "xelpmoc-core";
import { ResizableItem, ResizableColumn } from "./ForcedLayout";
export default class Story extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            pickItem: null,
            pickIndex: null,
            dragOverColumn: null,
            dragOverItem: null
        };
    }
    forceUpdate = () => {
        this.setState({
            pickIndex: null,
            pickItem: null,
            dragOverColumn: null,
            dragOverItem: null
        });
    };
    getNestedIndex = (index, data) => {
        let nestedIndex = 0;
        let mainIndex = 0;
        let counter = 0;

        data.forEach((value, ix) => {
            value.forEach((val, ix2) => {
                if (index === counter) {
                    mainIndex = ix;
                    nestedIndex = ix2;
                }
                counter++;
            });
        });
        return { columnIndex: mainIndex, itemIndex: nestedIndex };
    };
    getNestedItem = (index, data) => {
        const itemIndex = this.getNestedIndex(index, data);

        if (data[itemIndex.columnIndex][itemIndex.itemIndex])
            return data[itemIndex.columnIndex][itemIndex.itemIndex];
        else {
            // console.log("item not found");
            return null;
        }
    };
    onPick = index => {
        this.setState({ pickIndex: index });
    };
    onDrop = (index, direction, axis) => {
        let data = JSON.parse(JSON.stringify(this.state.data));
        //  this.setState({ dropItem: index });

        //const droppedOnIndex = this.getNestedIndex(index, data);
        // dragOverColumn: null,
        // dragOverItem: null
        const pickedUpIndex = this.getNestedIndex(this.state.pickIndex, data);
        // const droppedOnItem = Object.assign(
        //     {},
        //     this.getNestedItem(index, data)
        // );
        const droppedOnItem =
            data[this.state.dragOverColumn][this.state.dragOverItem];
        const pickedUpItem = Object.assign(
            {},
            this.getNestedItem(this.state.pickIndex, data)
        );
        // console.log(this.state.dragAxis);
        if (this.state.dragDirection === "INSIDE") {
            // console.log("inside");

            if (
                pickedUpItem &&
                droppedOnItem &&
                pickedUpItem !== undefined &&
                droppedOnItem !== undefined
            ) {
                data[this.state.dragOverColumn][
                    this.state.dragOverItem
                ] = pickedUpItem;
                data[pickedUpIndex.columnIndex][
                    pickedUpIndex.itemIndex
                ] = droppedOnItem;
                this.setState({ data }, () => {
                    this.forceUpdate();
                });
            }
        } else {
            if (this.state.dragAxis === "Y") {
                //  const normaliser = direction === "END" ? 1 : 0;

                const fillNormaliser = index < this.state.pickIndex ? 1 : 0;

                const normaliser = this.state.dragDirection === "END" ? 1 : 0;

                if (pickedUpItem) {
                    if (
                        this.state.dragOverColumn ===
                            pickedUpIndex.columnIndex &&
                        this.state.dragOverItem < pickedUpIndex.itemIndex
                    ) {
                        data[pickedUpIndex.columnIndex].splice(
                            pickedUpIndex.itemIndex,
                            1
                        );
                        data[this.state.dragOverColumn].splice(
                            this.state.dragOverItem + normaliser >= 0
                                ? this.state.dragOverItem + normaliser
                                : 0,
                            0,
                            pickedUpItem
                        );
                    } else {
                        // console.log(
                        //     "dragged over column",
                        //     this.state.dragOverColumn
                        // );
                        // console.log(
                        //     "dragged over item",
                        //     this.state.dragOverItem + normaliser
                        // );

                        data[this.state.dragOverColumn].splice(
                            this.state.dragOverItem + normaliser >= 0
                                ? this.state.dragOverItem + normaliser
                                : 0,
                            0,
                            pickedUpItem
                        );

                        data[pickedUpIndex.columnIndex].splice(
                            pickedUpIndex.itemIndex,
                            1
                        );
                    }

                    const noEmptyColumns = data.filter(val => {
                        return val.length > 0;
                    });

                    this.setState({ data: noEmptyColumns }, () => {
                        this.forceUpdate();
                    });
                }
            } else if (this.state.dragAxis === "X") {
                const normaliser = this.state.dragDirection === "END" ? 1 : 0;

                data[pickedUpIndex.columnIndex].splice(
                    pickedUpIndex.itemIndex,
                    1
                );

                data.splice(
                    this.state.dragOverColumn + normaliser >= 0
                        ? this.state.dragOverColumn + normaliser
                        : 0,
                    0,
                    [pickedUpItem]
                );

                const noEmptyColumns = data.filter(val => {
                    return val.length > 0;
                });
                this.setState({ data: noEmptyColumns }, () => {
                    this.forceUpdate();
                });
            } else {
                this.forceUpdate();
            }
        }
    };
    onDrag = (index, direction, axis) => {
        // console.log("dragDirection", direction);
        // console.log("dragAxis", axis);
        const data = this.state.data;
        const dragIndex = this.getNestedIndex(index, data);
        // console.log("dragIndex", dragIndex);

        this.setState({
            dragOverColumn: dragIndex.columnIndex,
            dragOverItem: dragIndex.itemIndex,
            dragAxis: axis,
            dragDirection: direction
        });
        // console.log("Column", this.state.dragOverColumn);
        // console.log("Item", this.state.dragOverItem);
        // console.log("Axis", this.state.axis);
        // console.log("Direction", this.state.dragDirection);

        // if (direction === "INSIDE") {
        //     this.setState({
        //         dragOverColumn: dragIndex.columnIndex,
        //         dragOverRow: dragIndex.itemIndex,
        //         dragAxis: null,
        //         dragDirection: direction,
        //         shiftedColumn: null
        //     });
        // } else {
        //     if (axis === "X") {
        //         this.setState({
        //             shiftedColumn: dragIndex.columnIndex + normaliser,
        //             shiftedItem: null
        //         });
        //     } else if (axis === "Y") {
        //         this.setState({
        //             shiftedColumn: dragIndex.columnIndex,
        //             shiftedItem: dragIndex.itemIndex + normaliser
        //         });
        //     }
        // }
        // console.log("shifted column", this.state.shiftedColumn);
        // console.log("shifted item", this.state.shiftedItem);
    };
    render() {
        const pickIndex = this.state.pickIndex;
        const ratios = this.state.data.map(item => {
            return item
                .map(val => {
                    if (val) return 1 / val.ratio;
                    else return 1;
                })
                .reduce((prev, next) => {
                    return prev + next;
                }, 0);
        });

        const normaliser = ratios.reduce((prev, next) => {
            return prev + 1 / next;
        }, 0);

        return (
            <DragDropMouse
                onPick={this.onPick}
                onDrag={this.onDrag}
                onDrop={this.onDrop}
                render={dragDropMouse => (
                    <ForcedLayout>
                        {this.state.data.map((val, index) => {
                            const xShiftDivider =
                                this.state.dragAxis === "X"
                                    ? this.state.dragOverColumn
                                    : null;
                            // console.log("dragAxis", this.state.dragAxis);
                            // console.log(
                            //     "drag column",
                            //     this.state.dragOverColumn
                            // );
                            // console.log("current column", index);
                            // console.log("xShift", xShiftDivider);
                            let shiftDirectionColumn = null;

                            if (xShiftDivider || xShiftDivider === 0) {
                                if (xShiftDivider > index) {
                                    shiftDirectionColumn = "LEFT";
                                }
                                // console.log()
                                if (xShiftDivider === index) {
                                    if (this.state.dragDirection === "START") {
                                        shiftDirectionColumn = "RIGHT";
                                    } else if (
                                        this.state.dragDirection === "END"
                                    ) {
                                        shiftDirectionColumn = "LEFT";
                                    }
                                }
                                if (xShiftDivider < index) {
                                    shiftDirectionColumn = "RIGHT";
                                }
                            }

                            return (
                                <ResizableColumn
                                    key={index}
                                    index={index}
                                    normaliser={normaliser}
                                    ratio={ratios[index]}
                                    shiftDirection={shiftDirectionColumn}
                                >
                                    {val.map((value, i) => {
                                        const itemIndex =
                                            index === 0
                                                ? i
                                                : this.state.data
                                                      .slice(0, [index])
                                                      .reduce((acc, curr) => {
                                                          return (
                                                              acc + curr.length
                                                          );
                                                      }, 0) + i;
                                        const isDraggedOver =
                                            this.state.dragDirection ===
                                                "INSIDE" &&
                                            this.state.dragOverColumn ===
                                                index &&
                                            this.state.dragOverItem === i;
                                        const yShiftDivider =
                                            this.state.dragAxis === "Y" &&
                                            this.state.dragOverColumn === index
                                                ? this.state.dragOverItem
                                                : null;

                                        //    console.log();
                                        // console.log("Column", this.state.dragOverColumn);
                                        // console.log("Item", this.state.dragOverItem);

                                        // console.log("Direction", this.state.dragDirection);
                                        // const shiftAmount = yShiftDivider
                                        //     ? yShiftDivider >= i
                                        //         ? -20
                                        //         : 20
                                        //     : 0;

                                        let shiftDirection = null;
                                        if (
                                            yShiftDivider ||
                                            yShiftDivider === 0
                                        ) {
                                            if (yShiftDivider > i) {
                                                shiftDirection = "UP";
                                            }
                                            // console.log()
                                            if (yShiftDivider === i) {
                                                if (
                                                    this.state.dragDirection ===
                                                    "START"
                                                ) {
                                                    shiftDirection = "DOWN";
                                                } else if (
                                                    this.state.dragDirection ===
                                                    "END"
                                                ) {
                                                    shiftDirection = "UP";
                                                }
                                            }
                                            if (yShiftDivider < i) {
                                                shiftDirection = "DOWN";
                                            }
                                        }

                                        return (
                                            <Draggable
                                                key={i}
                                                {...value}
                                                index={itemIndex}
                                                onPickUp={this.handlePick}
                                                shiftDirection={shiftDirection}
                                            >
                                                {() => {
                                                    const opacity =
                                                        pickIndex === itemIndex
                                                            ? 0.5
                                                            : 1;
                                                    return (
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                opacity: opacity,
                                                                position:
                                                                    "relative"
                                                                // transform: `translateY(${shiftAmount}px)`,
                                                                // transition:
                                                                //     "200ms"
                                                            }}
                                                        >
                                                            <Image
                                                                image={
                                                                    value
                                                                        ? value.image
                                                                        : ""
                                                                }
                                                            />
                                                            {isDraggedOver && (
                                                                <div
                                                                    style={{
                                                                        width:
                                                                            "100%",
                                                                        height:
                                                                            "100%",
                                                                        backgroundColor:
                                                                            "rgba(0,0,0,0.6)",
                                                                        position:
                                                                            "absolute",
                                                                        left: 0,
                                                                        top: 0,
                                                                        pointerEvents:
                                                                            "none"
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                }}
                                            </Draggable>
                                        );
                                    })}
                                </ResizableColumn>
                            );
                        })}
                    </ForcedLayout>
                )}
            />
        );
    }
}
