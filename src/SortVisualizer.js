import React from "react";
import Draggable from "react-draggable";

import "./SortVisualizer.css";

/**
Sort Visualizer Component that controls drawing data to canvas
and animation controls of sorting algorithms
**/
class SortVisualizer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width: 0, height: 0,
      type: {scatter: true, swirl: false},
      min_el: 10,
      max_el: 2048,
      num_el: 2048,
      data: [], //integer array to be sorted, etc...
    };
    this.canvas = React.createRef();
  }

  /** When component Mounts set the canvas based on window dimensions.
  Then initialize random data and plot it in default type: scatter plot**/
  componentDidMount(){
    const ctx = this.canvas.current.getContext("2d");
    const w = window.innerWidth*0.90;
    const h = window.innerHeight*0.80;
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    const rand_arr = [];
    for(let i = 0; i < this.state.num_el; i++){
      rand_arr.push(Math.random());
    }
    if(this.state.type.scatter === true) this.drawScatter(rand_arr, w, h);

    else if (this.state.type.swirl === true) this.drawSwirl(rand_arr, w, h);
    this.setState({data:rand_arr, width: w, height: h})
  }

  drawScatter(rand_arr, w, h){
    const ctx = this.canvas.current.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    for(let i = 0; i < rand_arr.length; i++){
      ctx.beginPath();
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.arc( ((i+1)/(this.state.num_el))*(w),
                (h)-rand_arr[i]*h,
                1,
                0,
                Math.PI*2);
      ctx.fill();
      ctx.closePath();
    }
  }

  drawSwirl(rand_arr, w ,h){
    const ctx = this.canvas.current.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    const max_r = Math.min(w/2, h/2);
    const center = {x:w/2,y:h/2};
    console.log("center", center);
    for(let i = 0; i < rand_arr.length; i++){
      ctx.beginPath();
      ctx.fillStyle = "rgb(255,255,255)";
      const theta = (i/rand_arr.length)*Math.PI*2;
      const r = rand_arr[i]*max_r;
      ctx.arc(center.x + r*Math.cos(theta),
              center.y + r*Math.sin(theta),
              1,
              0,
              2*Math.PI);
      ctx.fill();
      ctx.closePath();

    }
  }

  /**
  **/
  resetData(){
    const h = this.state.height;
    const w = this.state.width;
    //draw new random data in scatter plot

    const rand_arr = [];
    for(let i = 0; i < this.state.num_el; i++){
      rand_arr.push(Math.random());
    }
    if(this.state.type.scatter === true) this.drawScatter(rand_arr, w, h);
    else if(this.state.type.swirl === true) this.drawSwirl(rand_arr, w, h);
    this.setState({data:rand_arr});
    //draw new random data in swirl dot plot

  }

  changePlotType(e){
    const w = this.state.width;
    const h = this.state.height;

    if(e.target.value === "scatter"){
      this.setState({type:{scatter:true, swirl:false}});
      this.drawScatter(this.state.data, w,h);
    }
    else if(e.target.value === "swirl"){
      this.setState({type:{scatter:false, swirl:true}});
      this.drawSwirl(this.state.data, w, h);
    }
  }

  render(){
    return(
      <div className = "sortContainer">
        <Draggable>
          <div className = "infoBox">
          <p> Array Elements: {this.state.num_el} </p>
          <p> Visualization type:
            <select onChange= {(e) => this.changePlotType(e)}>
              <option value="scatter"> Scatter Plot</option>
              <option value="swirl"> Swirl Dots</option>
            </select>
          </p>
          <button onClick = {() => this.resetData()}> Reset </button>
          </div>
        </Draggable>
        <canvas ref = {this.canvas} className = "sortCanvas"></canvas>
      </div>
    )
  }
}

export default SortVisualizer;
