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
            updater: false
        };
        this.pickColumn = null;
        this.pickItem = null;
    }
    getNestedIndex = (index, data) => {
        let flatIndex = index;
        let nestedIndex = 0;
        let mainIndex = 0;

        let counter = 0;
        while (counter < data.length) {
            if (data[counter].length <= flatIndex) {
                mainIndex = mainIndex + 1;
                flatIndex = flatIndex - data[counter].length;
            } else {
                nestedIndex = flatIndex;
            }
            counter++;
        }
        console.log(data);
        console.log("index", index);
        console.log("mainindex", mainIndex);
        console.log("nested index", nestedIndex);
        return { columnIndex: mainIndex, itemIndex: nestedIndex };
    };
    getNestedItem = (index, data) => {
        const itemIndex = this.getNestedIndex(index, data);

        if (data[itemIndex.columnIndex][itemIndex.itemIndex])
            return data[itemIndex.columnIndex][itemIndex.itemIndex];
        else {
            console.log(index);
            console.log(itemIndex);
            console.log("item not found");
            //return null;
            return data[itemIndex.columnIndex][itemIndex.itemIndex - 1];
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
        let flatIndex = 0;

        this.setState({ pickIndex: index });
    };
    onDrop = (index, direction, axis) => {
        let data = JSON.parse(JSON.stringify(this.state.data));
        //  this.setState({ dropItem: index });
        console.log(direction);
        let flatIndex = 0;
        const droppedOnIndex = this.getNestedIndex(index, data);
        const pickedUpIndex = this.getNestedIndex(this.state.pickIndex, data);
        const droppedOnItem = this.getNestedItem(index, data);
        const pickedUpItem = this.getNestedItem(this.state.pickIndex, data);

        // console.log(this.state.pickIndex);
        // console.log(pickedUpIndex);
        // console.log(droppedOnIndex);
        // console.log(index);

        if (direction === "INSIDE") {
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
                this.setState({ data, updater: !this.state.updater }, () => {
                    this.forceUpdate();
                });
            }
        } else {
            if (axis === "Y") {
                console.log(droppedOnItem);
                console.log(pickedUpItem);
                const normaliser = direction === "END" ? 1 : 0;
                // console.log("drop column", droppedOnIndex.columnIndex);
                // console.log(
                //     "drop item",
                //     droppedOnIndex.itemIndex + normaliser >= 0
                //         ? droppedOnIndex.itemIndex + normaliser
                //         : 0
                // );
                // console.log("pick column", pickedUpIndex.columnIndex);
                // console.log("pick item", pickedUpIndex.itemIndex);
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
                this.setState({ data, updater: !this.state.updater }, () => {
                    this.forceUpdate();
                });
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
                this.setState({ data, updater: !this.state.updater }, () => {
                    this.forceUpdate();
                });
                console.log("X");
            }
        }
    };

    render() {
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
                updater={this.state.updater}
                onPick={this.onPick}
                onDrag={this.onDrag}
                onDrop={this.onDrop}
                render={dragDropMouse => (
                    <ForcedLayout updater={this.state.updater}>
                        {this.state.data.map((val, index) => {
                            return (
                                <ResizableColumn
                                    index={index}
                                    normaliser={normaliser}
                                    ratio={ratios[index]}
                                >
                                    {val.map((value, i) => {
                                        return (
                                            <Draggable
                                                {...value}
                                                index={
                                                    index === 0
                                                        ? i
                                                        : this.state.data
                                                              .slice(0, [index])
                                                              .reduce(
                                                                  (
                                                                      acc,
                                                                      curr
                                                                  ) => {
                                                                      return (
                                                                          acc +
                                                                          curr.length
                                                                      );
                                                                  },
                                                                  0
                                                              ) + i
                                                }
                                                onPickUp={this.handlePick}
                                            >
                                                {() => {
                                                    return (
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                height: "100%"

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
