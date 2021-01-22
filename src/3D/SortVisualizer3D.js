import React from "react";
import WebGL from "./WebGL";

import "./SortVisualizer3D.css";

require("react-dom");
window.React2 = require("react");
console.log("One version of React?",window.React1 === window.React2);


class SortVisualizer3D extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width: 0, height: 0,
      num_el: 2048,
      data: [],
      heuristic: "x+y",
    }

    this.canvas = React.createRef();
  }

  componentDidMount(){
    const w = window.innerWidth;
    const h = window.innerHeight;

    const rand_arr = [];
    for(let i = 0; i < 200; i++){
      for(let j = 0; j < 200; j++){
        rand_arr.push([Math.random(), Math.random()]);
      }
    }
    // draw(gl);
    this.setState({data: rand_arr, width:w, height: h})
  }

  /**
  evaluate the heuristic on the data values
  **/
  hEval(x,y){
    return x + y;
  }


  render(){
    return (
      <div>
        <WebGL/>
        {/*<canvas ref = {this.canvas} className = "3Dcanvas"
        style = {{height: this.state.height, width: this.state.width}}></canvas> */}
      </div>
    )
  }
}

export default SortVisualizer3D;
