import React from "react";
import Draggable from "react-draggable";
import getMergeSortAnimations from "./SortAlgorithms/Javascript/MergeSort.js";
import getInsertionSortAnimations from "./SortAlgorithms/Javascript/InsertionSort.js";

import "./SortVisualizer.css";

/**
Sort Visualizer Component that controls drawing data to canvas
and animation controls of sorting algorithms
**/
class SortVisualizer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width: 0, height: 0, maxtimeouts: 0,
      type: {scatter: true, swirl: false},
      min_el: 10,
      max_el: 2048,
      num_el: 512,
      data: [], //integer array to be sorted, etc...
      running: false,
    };
    this.canvas = React.createRef();
  }

  /** When component Mounts set the canvas based on window dimensions.
  Then initialize random data and plot it in default type: scatter plot**/
  componentDidMount(){
    const ctx = this.canvas.current.getContext("2d");
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.canvas.width = w;
    ctx.canvas.height = h*0.95;

    const rand_arr = [];
    for(let i = 0; i < this.state.num_el; i++){
      rand_arr.push(Math.random());
    }
    if(this.state.type.scatter === true) this.drawScatter(rand_arr, w, h);

    else if (this.state.type.swirl === true) this.drawSwirl(rand_arr, w, h);
    this.setState({data:rand_arr, width: w, height: h})
  }

  drawScatter(rand_arr, w, h, selected){
    const ctx = this.canvas.current.getContext("2d");
    var highlight = false;
    ctx.clearRect(0, 0, w, h);
    for(let i = 0; i < rand_arr.length; i++){
      ctx.beginPath();
      if(selected !== undefined && selected !== null){
        for(let j = 0; j < selected.length; j++){
          if(selected[j] === i) highlight = true;
        }
      }
      ctx.fillStyle = "rgb(255,255,255)";
      ctx.arc( ((i+1)/(this.state.num_el))*(w),
                (h*0.95)-(rand_arr[i]*h+1),
                1,
                0,
                Math.PI*2);
      ctx.fill();
      ctx.closePath();
      // draw select box
      if(highlight === true){
        const x = ((i+1)/(this.state.num_el))*(w) -6;
        const y = (h*0.95)-(rand_arr[i]*h+1) -6;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.rect(x,y,12,12);
        ctx.stroke();
        ctx.closePath();
        highlight = false;
      }
    }
  }

  drawSwirl(rand_arr, w ,h, selected){
    const ctx = this.canvas.current.getContext("2d");
    var highlight = false;
    ctx.clearRect(0, 0, w, h);
    const max_r = Math.min(w/2, h/2);
    const center = {x:w/2,y:h/2};
    console.log("center", center);
    for(let i = 0; i < rand_arr.length; i++){
      ctx.beginPath();
      if(selected !== undefined && selected !== null){
        for(let j = 0; j < selected.length; j++){
          if(selected[j] === i) highlight = true;
        }
      }
      ctx.fillStyle = "rgb(255,255,255)";
      const theta = (i/rand_arr.length)*Math.PI*2;
      const r = rand_arr[i]*max_r;
      const xPos = center.x + r*Math.cos(theta);
      const yPos = center.y + r*Math.sin(theta)
      ctx.arc(xPos,
              yPos,
              1,
              0,
              2*Math.PI);
      ctx.fill();
      ctx.closePath();
      if(highlight === true){
        const x = xPos-6;
        const y = yPos-6;
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255, 0, 0)";
        ctx.rect(x,y,12,12);
        ctx.stroke();
        ctx.closePath();
        highlight = false;
      }
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

  // animate(){
  //   let x = 0;
  //   const rand_arr = this.state.data;
  //   const h = this.state.height;
  //   const w = this.state.width;
  //   this.setState({running:true});
  //   console.time("javascriptSort")
  //   const animations = getInsertionSortAnimations(rand_arr.slice());
  //   console.timeEnd("javascriptSort")
  //   for(let i = 0; i < animations.length; i++){
  //     if(animations[i].swap !== null && animations[i].swap !== undefined){
  //       x = setTimeout(() => {
  //         rand_arr[animations[i].swap[0]] = animations[i].swap[1];
  //         this.drawScatter(rand_arr);
  //       }, i*1)
  //
  //     }
  //     else if(animations[i].set !== null && animations[i].set !== undefined){
  //       x = setTimeout(() => {
  //         rand_arr[animations[i].set[0]] = animations[i].set[1];
  //         this.drawScatter(rand_arr);
  //       }, i*1);
  //     }
  //     else if (animations[i].select !== null && animations[i].select !== undefined){
  //       x = setTimeout(() => {
  //         const selected = animations[i].select;
  //         this.drawScatter(rand_arr,w,h, selected);
  //       }, i*1)
  //     }
  //   }
  //   this.setState({maxtimeouts: x});
  // }

  startAnimate(){
    const rand_arr = this.state.data;
    const h = this.state.height;
    const w = this.state.width;
    const animations = getInsertionSortAnimations(rand_arr.slice());
    const that = this;
    waitStartAnimate(that, rand_arr, w, h, animations, 0) // awaits setting state then starts animation
    // this.setState({running:true});
    //
    // this.animate(rand_arr, w, h, animations, 0);
  }

  animate(rand_arr, w, h, animations, cur_index){
    if(this.state.running !== false){
      var selected = null;
      if(animations[cur_index].set !== null && animations[cur_index].set !== undefined){
        rand_arr[animations[cur_index].set[0]] = animations[cur_index].set[1];
      }
      else if(animations[cur_index].select !== null &&
                  animations[cur_index].select !== undefined){
                    selected = animations[cur_index].select;
                    console.log(selected);
                  }
      if(this.state.type.scatter === true) this.drawScatter(rand_arr, w, h, selected);
      else if(this.state.type.swirl === true) this.drawSwirl(rand_arr, w, h, selected);
      // continue animation when possible
      if(cur_index < animations.length) requestAnimationFrame( () => {
                                            this.animate(rand_arr, w, h, animations, cur_index+1)})
                                          }
  }

  componentWillUnmount(){
    this.clearAnimations();
  }

  clearAnimations(){
    var id = this.state.maxtimeouts;
    while(id){
      clearInterval(id);
      id --;
    }
    this.setState({running:false})
  }

  updateElements(e){
    e.preventDefault();
    const new_num_el = parseInt(e.target.value);
    const that = this;
    waitUpdateElements(new_num_el, that)
  }

  render(){
    return(
      <div className = "sortContainer">
        <Draggable>
          <div className = "infoBox">
          <p> Array Elements
            <input disabled = {this.state.running === true}
            onChange = {(e) => this.updateElements(e)}
              type = "range"
              min = {this.state.min_el}
              max = {this.state.max_el}
              value = {this.state.num_el}>
            </input> {this.state.num_el} </p>
          <p> Visualization type:
            <select onChange= {(e) => this.changePlotType(e)}>
              <option value="scatter"> Scatter Plot</option>
              <option value="swirl"> Swirl Dots</option>
            </select>
          </p>
          <p>
            Algorithm
              <select disabled = {this.state.running === true}>
              <optgroup label = "Insertion Family">
                <option> Insertion Sort</option>
                <option> Binary Insertion Sort</option>
              </optgroup>
              <optgroup label = "Merge Family">
                <option> Merge Sort </option>
                <option disabled = {true}> In-Place Merge Sort</option>
              </optgroup>
              <optgroup label = "Selection Family">
                <option disabled = {true}> Selection Sort </option>
                <option disabled = {true}> Max-Heap Sort </option>
              </optgroup>
              <optgroup label = "Exchange Family">
                <option> Quick Sort </option>
                <option disabled = {true}> Stable Quick Sort </option>
                <option disabled = {true}> Dual Pivot Quick Sort</option>
              </optgroup>
              <optgroup label = "Non-Comparison Family">
                <option disabled = {true}> Radix LSD Sort, Base 4</option>
                <option disabled = {true}> Radix MSD Sort, Base 8</option>
                <option disabled = {true}> In Place Radix LSD Sort, Base 16</option>
              </optgroup>
              <optgroup label = "Hybrids">
                <option> Binary Merge Sort </option>
                <option> TimSort </option>
                <option> IntroSort </option>
              </optgroup>
              </select>
          </p>
          <p> Language
            <select>
            <option> Javascript</option>
            <option> C++ </option>
            </select>
          </p>
          <button
          onClick = {() => this.resetData()}
          disabled = {this.state.running === true}>
             Reset
           </button>
          <button
          onClick = {() => this.startAnimate()}
          disabled = {this.state.running === true}>
          Sort!
          </button>
          <button
          onClick = {() => this.clearAnimations()}>
            Stop
          </button>
          </div>
        </Draggable>
        <canvas ref = {this.canvas} className = "sortCanvas"></canvas>
      </div>
    )
  }
}

export default SortVisualizer;

/** ASYNCHRONOUS AND HELPER FUNCTIONS**/

async function waitUpdateElements(val, that){
  await that.setState({num_el: val});
  that.resetData();
}

async function waitStartAnimate(that, rand_arr, w, h, animations){
  await that.setState({running:true});
  that.animate(rand_arr, w, h, animations, 0);
}
