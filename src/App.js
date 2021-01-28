import React from "react";
import './App.css';
import SortVisualizer from "./2D/SortVisualizer.js";
import SortVisualizer3D from "./3D/SortVisualizer3D.js";

class App extends React.Component{
  render(){return (
    <div className="App">
      <header className="App-header">
      <SortVisualizer3D/>
      {/*
      <SortVisualizer/>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}

      </header>
    </div>
  );
}
}

export default App;
