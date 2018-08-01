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

            pickIndex: null
        };
        this.pickColumn = null;
        this.pickItem = null;
    }
    forceUpdate = () => {
        this.setState({ pickIndex: null, pickItem: null });

        this.pickColumn = null;
        this.pickItem = null;
    };
    getNestedIndex = (index, data) => {
        let flatIndex = index;
        let index2 = index;
        let nestedIndex = 0;
        let mainIndex = 0;
        // console.log(index);
        let counter = 0;
        // while (counter < data.length) {
        //     if (data[counter].length <= flatIndex) {
        //         flatIndex = flatIndex - data[counter].length;
        //         mainIndex++;
        //     }

        //     nestedIndex = flatIndex;

        //     counter++;
        // }
        let counter2 = 0;
        data.forEach((value, ix) => {
            value.forEach((val, ix2) => {
                if (index2 === counter2) {
                    mainIndex = ix;
                    nestedIndex = ix2;
                }
                counter2++;
            });
        });
        // console.log(data);
        // console.log("index", index);
        // console.log("mainindex", mainIndex);
        // console.log("nested index", nestedIndex);
        return { columnIndex: mainIndex, itemIndex: nestedIndex };
    };
    getNestedItem = (index, data) => {
        const itemIndex = this.getNestedIndex(index, data);

        if (data[itemIndex.columnIndex][itemIndex.itemIndex])
            return data[itemIndex.columnIndex][itemIndex.itemIndex];
        else {
            // console.log(index);
            // console.log(itemIndex);
            console.log("item not found");
            return null;
            //return data[itemIndex.columnIndex][itemIndex.itemIndex - 1];
        }
    };
    onDrag = val => {
        console.log(val);
    };
    // handleDrop = (group, column, item) => {
    //     let data = this.state.data.slice();
    //     if (this.pickColumn !== null && this.pickItem !== null) {
    //         console.log(this.state.data);
    //         const pickedUpItem = data[this.pickColumn][this.pickItem];
    //         console.log(pickedUpItem);
    //         console.log(data);

    //         data[this.pickColumn].splice(this.pickItem, 1);
    //         //  Object.assign([], data, { [this.pickColumn]: pickedUpItem });
    //         console.log(column, item);
    //         data[column].splice(item + 1, 0, pickedUpItem);
    //         console.log(data);
    //         this.setState({ data, dropX: null, dropY: null });
    //         // this.setState({ data });
    //     }
    // };
    onPick = index => {
        this.setState({ pickIndex: index });
    };
    onDrop = (index, direction, axis) => {
        let data = JSON.parse(JSON.stringify(this.state.data));
        //  this.setState({ dropItem: index });

        let flatIndex = 0;
        const droppedOnIndex = this.getNestedIndex(index, data);
        const pickedUpIndex = this.getNestedIndex(this.state.pickIndex, data);
        const droppedOnItem = Object.assign(
            {},
            this.getNestedItem(index, data)
        );
        const pickedUpItem = Object.assign(
            {},
            this.getNestedItem(this.state.pickIndex, data)
        );

        console.log(this.state.pickIndex);
        console.log(pickedUpIndex);
        // console.log(droppedOnIndex);
        // console.log(index);

        if (direction === "INSIDE") {
            console.log(this.state.data);
            console.log(this.state.pickIndex);
            console.log(pickedUpIndex);
            console.log(droppedOnIndex);
            if (
                pickedUpItem &&
                droppedOnItem &&
                pickedUpItem !== undefined &&
                droppedOnItem !== undefined
            ) {
                data[droppedOnIndex.columnIndex][
                    droppedOnIndex.itemIndex
                ] = pickedUpItem;
                data[pickedUpIndex.columnIndex][
                    pickedUpIndex.itemIndex
                ] = droppedOnItem;
                this.setState({ data }, () => {
                    this.forceUpdate();
                });
            }
        } else {
            if (axis === "Y") {
                const normaliser = direction === "END" ? 1 : 0;
                // console.log("drop column", droppedOnIndex.columnIndex);
                // console.log(
                //     "drop item",
                //     droppedOnIndex.itemIndex + normaliser >= 0
                //         ? droppedOnIndex.itemIndex + normaliser
                //         : 0
                // );
                console.log("dropIndex", index);
                console.log("pickIndex", this.state.pickIndex);
                console.log("drop2", droppedOnIndex);
                console.log("pick2", pickedUpIndex);
                const fillNormaliser = index < this.state.pickIndex ? 1 : 0;
                if (pickedUpItem) {
                    data[droppedOnIndex.columnIndex].splice(
                        droppedOnIndex.itemIndex + normaliser >= 0
                            ? droppedOnIndex.itemIndex + normaliser
                            : 0,
                        0,
                        pickedUpItem
                    );

                    data[pickedUpIndex.columnIndex].splice(
                        pickedUpIndex.itemIndex,
                        1
                    );

                    this.setState({ data }, () => {
                        this.forceUpdate();
                    });
                }
            } else if (axis === "X") {
                const normaliser = direction === "END" ? 1 : 0;

                data.splice(
                    droppedOnIndex.columnIndex + normaliser >= 0
                        ? droppedOnIndex.columnIndex + normaliser
                        : 0,
                    0,
                    [pickedUpItem]
                );
                data[pickedUpIndex.columnIndex].splice(
                    pickedUpIndex.itemIndex,
                    1
                );
                console.log(data);
                this.setState({ data }, () => {
                    this.forceUpdate();
                });
                console.log("X");
            } else {
                this.forceUpdate();
            }
        }
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
                            return (
                                <ResizableColumn
                                    key={index}
                                    index={index}
                                    normaliser={normaliser}
                                    ratio={ratios[index]}
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
                                        return (
                                            <Draggable
                                                key={i}
                                                {...value}
                                                index={itemIndex}
                                                onPickUp={this.handlePick}
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
                                                                opacity: opacity
                                                                // backgroundImage: `url(${
                                                                //     value.image
                                                                // })`,
                                                                // backgroundPosition:
                                                                //     "center",
                                                                // backgroundSize:
                                                                //     "cover"
                                                            }}
                                                        >
                                                            <Image
                                                                image={
                                                                    value
                                                                        ? value.image
                                                                        : ""
                                                                }
                                                            />
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
