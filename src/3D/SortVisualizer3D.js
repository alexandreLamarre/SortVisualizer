import React from "react";
import WebGL from "./WebGL";

import Delaunay from "./\/DelaunayTriangulation";
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

    this.gl = React.createRef();
  }

  componentDidMount(){
    const w = window.innerWidth;
    const h = window.innerHeight*0.95;
    this.setState({width: w, height: h});

    const rand_arr = [];
    const indices = [];
    for(let i = 0; i < 200; i++){
      for(let j = 0; j < 200; j++){
        rand_arr.push([Math.random(), Math.random()]);
        indices.push(i*200+j);
      }
    }
    console.log(Delaunay.triangulate(rand_arr).triangles);
    console.log(rand_arr.length);
    // draw(gl);
    this.gl.current.drawData(rand_arr, indices)
    this.setState({data: rand_arr})
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
        <WebGL ref = {this.gl} cHeight = {this.state.height} cWidth = {this.state.width}/>
        {/*<canvas ref = {this.canvas} className = "3Dcanvas"
        style = {{height: this.state.height, width: this.state.width}}></canvas> */}
      </div>
    )
  }
}

export default SortVisualizer3D;
