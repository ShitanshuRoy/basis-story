import React from "react";
// import ResizableItem from "./ResizableItem";
import "./ForcedLayout.css";
const DRAGGABLE_THRESHOLD = 20;
export class ResizableItem extends React.Component {
    render() {
        let className = "ForcedLayout-item";
        // if (
        //     this.props.pickUpY &&
        //     this.props.pickUpX &&
        //     this.checkIfInside(this.props.pickUpY, "Y") &&
        //     this.checkIfInside(this.props.pickUpX, "X")
        // ) {
        //     className = "ForcedLayout-item-faded";
        //     this.handlePickUp(0, this.props.columnIndex, this.props.itemIndex);
        // } else {
        //     if (
        //         this.props.dragY &&
        //         this.props.dragX &&
        //         this.props.dragX > this.box.xStart &&
        //         this.props.dragX < this.box.xEnd
        //     ) {
        //         if (this.checkThreshold(this.props.dragY, "Y") === "START") {
        //             className = "ForcedLayout-item-top";
        //         } else if (
        //             this.checkThreshold(this.props.dragY, "Y") === "END"
        //         ) {
        //             className = "ForcedLayout-item-bottom";
        //         }
        //     }
        // }
        // if (this.checkThreshold(this.props.dropY, "Y") === "START") {
        //     if (this.props.onDrop) {
        //         this.props.onDrop(
        //             0,
        //             this.props.columnIndex,
        //             this.props.itemIndex
        //         );
        //     }
        // }
        if (this.props.shiftDirection === "UP") {
            className = "ForcedLayout-item-top";
        } else if (this.props.shiftDirection === "DOWN") {
            className = "ForcedLayout-item-bottom";
        }

        return (
            <div
                className={className}
                ref={this.element}
                style={{ paddingBottom: `${100 / this.props.ratio}%` }}
            >
                <div className="ForcedLayout-itemContent">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export class ResizableColumn extends React.Component {
    render() {
        // console.log(this.props.pickUp);
        // console.log(this.box.xEnd);

        let className = "ForcedLayout-column";

        // this.checkThreshold(this.props.dragX, "X");
        // if (this.checkThreshold(this.props.dragX, "X") === "START") {
        //     className = "ForcedLayout-column-left";
        // } else if (this.checkThreshold(this.props.dragX, "X") === "END") {
        //     className = "ForcedLayout-column-right";
        // }
        //  console.log(this.props.shiftDirection);
        if (this.props.shiftDirection === "LEFT") {
            className = "ForcedLayout-column-left";
        } else if (this.props.shiftDirection === "RIGHT") {
            className = "ForcedLayout-column-right";
        }

        return (
            <div
                className={className}
                ref={this.element}
                style={{
                    width: `${100 / this.props.ratio / this.props.normaliser}%`
                }}
            >
                {this.props.children && this.props.children.length > 1 ? (
                    this.props.children.map(child => {
                        return (
                            <ResizableItem {...child.props}>
                                {child}
                            </ResizableItem>
                        );
                    })
                ) : (
                    <ResizableItem {...this.props.children[0].props}>
                        {this.props.children}
                    </ResizableItem>
                )}
            </div>
        );
    }
}
export default class ForcedLayout extends React.Component {
    render() {
        // const ratios = this.props.data.map(item => {
        //     return item
        //         .map(val => {
        //             return 1 / val.ratio;
        //         })
        //         .reduce((prev, next) => {
        //             return prev + next;
        //         }, 0);
        // });

        // const normaliser = ratios.reduce((prev, next) => {
        //     return prev + 1 / next;
        // }, 0);

        return <div className="ForcedLayout-base">{this.props.children}</div>;
    }
}
