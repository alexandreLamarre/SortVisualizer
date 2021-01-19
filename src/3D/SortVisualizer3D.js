import React from "react";

import "./SortVisualizer3D.css"
class SortVisualizer3D extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width: 0, height: 0,
      num_el: 2048,
      data: [],
    }

    this.canvas = React.createRef();
  }

  componentDidMount(){
    const ctx = this.canvas.current.getContext("2d");
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.canvas.width = w;
    ctx.canvas.height = h*0.95;

    const rand_arr = [];
    for(let i = 0; i < 200; i++){
      for(let j = 0; j < 200; j++){
        rand_arr.push([Math.random(), Math.random()]);
      }
    }

    this.rDraw(rand_arr, w, h, [], []);
    this.setState({data: rand_arr, width:w, height: h})
  }

  rDraw(rand_arr, w, h, selected, sorted_arr){
    const ctx = this.canvas.current.getContext("2d");
    console.time("animations");
    ctx.clearRect(0,0,w,h);
    for(let i = 0; i < rand_arr.length; i++){
      ctx.beginPath();
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.arc(rand_arr[i][0]*w, rand_arr[i][1]*h, 1, 0, Math.PI*2);
      ctx.fill();
      ctx.closePath();
    }
    console.timeEnd("animations");
  }

  render(){
    return (
      <div>
        <canvas ref = {this.canvas} className = "3Dcanvas"></canvas>
      </div>
    )
  }
}

export default SortVisualizer3D;
