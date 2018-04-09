import React, { Component } from "react";
import logo from "./logo.svg";
import Story from "./story/components/Story";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Story />
      </div>
    );
  }
}

export default App;
