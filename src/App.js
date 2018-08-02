import React, { Component } from "react";
import Story from "./story/components/Story";
import DragDropMouse from "./story/components/DragDropMouse";
import { Draggable } from "./story/components/DragDropMouse";
import { Image } from "xelpmoc-core";
// import ResizableItem from "./story/components/ResizableItem";
import logo from "./logo.svg";
import "./App.css";

const data = [
    [
        {
            image:
                "http://ultimateclassicrock.com/files/2011/06/Killers625.jpg?w=980&q=75",
            ratio: 1,
            index: 0
        },
        {
            image: "http://ultimateclassicrock.com/files/2011/06/mind625.jpg",
            ratio: 1,
            index: 1
        },
        {
            image: "https://i.ytimg.com/vi/ikQd8EbwN8g/hqdefault.jpg",
            ratio: 1,
            index: 2
        }
    ],
    [
        {
            image:
                "https://i.pinimg.com/736x/e8/09/a4/e809a47a8c3988ff5074861ba62ec52e--iron-maiden-album-covers-iron-maiden-eddie.jpg",
            ratio: 1,
            index: 3
        },

        {
            image: "https://usercontent1.hubstatic.com/12321410_f520.jpg",
            ratio: 1,
            index: 4
        },
        {
            image:
                "https://uproxx.files.wordpress.com/2015/09/iron-maiden-somewhere-in-time-1986.jpg?quality=95&w=650",
            ratio: 1,
            index: 5
        },
        {
            image: "http://ultimateclassicrock.com/files/2011/06/7.jpg",
            ratio: 1,
            index: 6
        }
    ],
    [
        {
            image:
                "https://e.snmc.io/lk/l/l/6ca3a30dd246788ebebbfacd6f8b0f15/2713646.jpg",
            ratio: 1,
            index: 7
        },
        {
            image: "http://ultimateclassicrock.com/files/2011/06/LIVE625.jpg",
            ratio: 1,
            index: 8
        },
        {
            image:
                "https://i.pinimg.com/736x/37/57/d0/3757d0b3b268e54004db7605652c6433--iron-maiden-album-covers-iron-maiden-eddie.jpg",
            ratio: 1,
            index: 9
        },
        {
            image:
                "http://bh-s2.azureedge.net/bh-uploads/2015/10/Iron_Maiden-750x750.gif",
            ratio: 1,
            index: 10
        }
    ],
    [
        {
            image: "https://usercontent1.hubstatic.com/12321308_f520.jpg",
            ratio: 1,
            index: 11
        },
        {
            image:
                "https://images.genius.com/f9b6af607494cb7ce8af3c63843daca4.1000x1000x1.jpg",
            ratio: 1,
            index: 12
        },
        {
            image: "https://usercontent2.hubstatic.com/12321317_f520.jpg",
            ratio: 1,
            index: 13
        }
    ]
];

// const data = [
//     [
//         {
//             image:
//                 "https://i.pinimg.com/564x/eb/3a/2c/eb3a2c2b981176de7a5c83024c1f0614.jpg",
//             ratio: 1.5
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/2b/a4/37/2ba4372c8829cb44b66ad65a7eabe784.jpg",
//             ratio: 0.75
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/f3/b2/61/f3b261b5e3911b5a1f2c062cc4a12414.jpg",
//             ratio: 0.5
//         }
//     ],
//     [
//         {
//             image:
//                 "https://i.pinimg.com/564x/3d/bc/92/3dbc92f28e29c04805efcf6bc398ae8b.jpg",
//             ratio: 1.2
//         },

//         {
//             image:
//                 "https://i.pinimg.com/564x/92/e9/86/92e986f20d48efd6db12c4ad17aceab7.jpg",
//             ratio: 1
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/e0/e5/12/e0e512b7d81db05d882f52bfcadf3fb3.jpg",
//             ratio: 0.8
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/39/99/2b/39992bfc6bcee111dfa9f038ea9a82de.jpg",
//             ratio: 0.7
//         }
//     ],
//     [
//         {
//             image:
//                 " https://i.pinimg.com/564x/06/58/e9/0658e9ce8b1109e99046ecc77fdf0021.jpg",
//             ratio: 1.2
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/5c/f0/ee/5cf0eed9408fb9505021b289527b849f.jpg",
//             ratio: 0.5
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/00/39/09/00390983ca7a26717d588366c850e82f.jpg",
//             ratio: 1.2
//         },
//         {
//             image:
//                 "https://i.pinimg.com/originals/b1/9d/4f/b19d4f2b637df877d5c8aa9ce1f31330.jpg",
//             ratio: 1.4
//         }
//     ],
//     [
//         {
//             image:
//                 "https://i.pinimg.com/564x/97/fa/b3/97fab3811b85f66564e2c44ac63dd6b1.jpg",
//             ratio: 0.8
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/a4/f5/96/a4f596b63efaea8776825d2e7483d9e7.jpg",
//             ratio: 0.7
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/b1/95/13/b19513b1bbc1272162f24f3b3fca2637.jpg",
//             ratio: 1
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/67/24/81/6724815c5205bfdaefa5365c004b73e4.jpg",
//             ratio: 1.2
//         }
//     ]
// ];

// const data = [
//     [
//         {
//             image:
//                 "https://i.pinimg.com/564x/eb/3a/2c/eb3a2c2b981176de7a5c83024c1f0614.jpg",
//             ratio: 1.5
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/2b/a4/37/2ba4372c8829cb44b66ad65a7eabe784.jpg",
//             ratio: 0.75
//         },
//         {
//             image:
//                 "https://i.pinimg.com/originals/b1/9d/4f/b19d4f2b637df877d5c8aa9ce1f31330.jpg",
//             ratio: 1.4
//         }
//     ],
//     [
//         {
//             image:
//                 "https://i.pinimg.com/564x/3d/bc/92/3dbc92f28e29c04805efcf6bc398ae8b.jpg",
//             ratio: 1.2
//         },

//         {
//             image:
//                 "https://i.pinimg.com/564x/92/e9/86/92e986f20d48efd6db12c4ad17aceab7.jpg",
//             ratio: 1
//         },
//         {
//             image:
//                 "https://i.pinimg.com/564x/e0/e5/12/e0e512b7d81db05d882f52bfcadf3fb3.jpg",
//             ratio: 0.8
//         }
//     ]
// ];
class App extends Component {
    // getNestedIndex = (index, data) => {
    //     let flatIndex = index;
    //     let nestedIndex = 0;
    //     let mainIndex = 0;

    //     let counter = 0;
    //     while (counter < data.length) {
    //         if (data[counter].length <= flatIndex) {
    //             mainIndex = mainIndex + 1;
    //             flatIndex = flatIndex - data[counter].length;
    //         } else {
    //             nestedIndex = flatIndex;
    //         }
    //         counter++;
    //     }
    //     console.log(data);
    //     console.log("index", index);
    //     console.log("mainindex", mainIndex);
    //     console.log("nested index", nestedIndex);
    //     return { columnIndex: mainIndex, itemIndex: nestedIndex };
    // };

    render() {
        // console.log(this.getNestedIndex(5, data));
        return (
            <div className="App">
                <Story data={data} />
                {/* <DragDropMouse
                    // onPick={this.onPick}
                    // onDrag={this.onDrag}
                    // onDrop={this.onDrop}
                    render={dragDropMouse => (
                        <div style={{ width: "100%" }}>
                            <Draggable>
                                {val => {
                                    return (
                                        <div>
                                            <ResizableItem func={val} />
                                        </div>
                                    );
                                }}
                            </Draggable>
                            <Draggable>
                                {val => {
                                    return (
                                        <div
                                            style={{
                                                width: "200px",
                                                height: "100px",
                                                backgroundColor: "#777"
                                            }}
                                        />
                                    );
                                }}
                            </Draggable>
                            <Draggable>
                                {val => {
                                    return (
                                        <div
                                            style={{
                                                width: "200px",
                                                height: "100px",
                                                backgroundColor: "#666"
                                            }}
                                        />
                                    );
                                }}
                            </Draggable>
                        </div>
                    )}
                /> */}
            </div>
        );
    }
}

export default App;
