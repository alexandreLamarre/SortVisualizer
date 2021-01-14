import React from "react";
import Draggable from "react-draggable";
import getMergeSortAnimations from "./SortAlgorithms/Javascript/MergeSort.js";
import getInsertionSortAnimations from "./SortAlgorithms/Javascript/InsertionSort.js";
import getQuickSortAnimations from "./SortAlgorithms/Javascript/QuickSort.js";
import getDualQuickSortAnimations from "./SortAlgorithms/Javascript/DualQuickSort.js";
import getSelectionSortAnimations from "./SortAlgorithms/Javascript/SelectionSort.js";
import getMaxHeapSortAnimations from  "./SortAlgorithms/Javascript/HeapSort.js";
import getTimSortAnimations from "./SortAlgorithms/Javascript/TimSort.js";

import githubLink from "./githubLink.png";

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
      type: "scatter",
      min_el: 10,
      max_el: 2048,
      num_el: 512,
      data: [], //integer array to be sorted, etc...
      sorted_data: [],
      running: false,
      algorithm: "insertion",
      realTime: 0,
      comparisons: 0,
      swaps: 0,
      mainWrites: 0,
      auxWrites: 0,
    };
    this.canvas = React.createRef();
  }

  draw(rand_arr, w, h, selected, sorted_arr){
    if(this.state.type === "scatter") this.drawScatter(rand_arr, w, h, selected);
    if(this.state.type === "swirl") this.drawSwirl(rand_arr, w, h, selected);
    if(this.state.type === "disparity") this.drawDisparity(rand_arr, w, h,
                                                            selected, sorted_arr);
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
    let sorted_arr = rand_arr.slice().sort();

    this.draw(rand_arr, w, h, [], sorted_arr);
    this.setState({data:rand_arr, width: w, height: h, sorted_data: sorted_arr});
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
                (h*0.95)-(rand_arr[i]*(h*0.95)+1),
                1,
                0,
                Math.PI*2);
      ctx.fill();
      ctx.closePath();
      // draw select box
      if(highlight === true){
        const x = ((i+1)/(this.state.num_el))*(w) -6;
        const y = (h*0.95)-(rand_arr[i]*h*0.95+1) -6;
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
    const max_r = Math.min(w/2, (h*0.95)/2);
    const center = {x:w/2,y:h*0.95/2};
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

  drawDisparity(rand_arr, w, h, selected, sorted_data){
    const ctx = this.canvas.current.getContext("2d");
    var highlight = false;
    ctx.clearRect(0, 0, w, h);
    const max_r = Math.min(w/2, h*0.95/2);
    const c = rand_arr.length;
    const center = {x:w/2,y:h*0.95/2};
    const num_el = rand_arr.length;
    for(let i = 0; i < rand_arr.length; i++){
      const new_color = assignColorGradient(rand_arr[i]);
      //closeness measures the distance from the center:
      // a distance of 1 means the element is in the correct place in the
      //sorted array
      // a distance of 0 means it is the furthest possible from the correct place
      //in the sorted array
      const sorted_index = sorted_data.indexOf(rand_arr[i]);
      const closeness = c - Math.abs(i-sorted_index);
      ctx.beginPath();
      if(selected !== undefined && selected !== null){
        for(let j = 0; j < selected.length; j++){
          if(selected[j] === i) highlight = true;
        }
      }
      ctx.fillStyle = new_color;
      const theta = (i/rand_arr.length)*Math.PI*2;
      const r = ((max_r)*closeness/c);
      const xPos = center.x + r*Math.cos(theta);
      const yPos = center.y + r*Math.sin(theta);
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
        ctx.strokeStyle = "rgb(255, 255, 255)";
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
      rand_arr.push(Math.random()*0.95);
    }
    const selected = []; //no elements initially selected

    let sorted_arr = rand_arr.slice().sort();
    this.draw(rand_arr, w, h, selected, sorted_arr);
    this.setState({data:rand_arr, sorted_data: sorted_arr});

  }

  changePlotType(e){
    const w = this.state.width;
    const h = this.state.height;

    if(e.target.value === "scatter"){
      this.setState({type: e.target.value});
      this.drawScatter(this.state.data, w,h);
    }
    else if(e.target.value === "swirl"){
      this.setState({type: e.target.value});
      this.drawSwirl(this.state.data, w, h);
    }
    else if(e.target.value === "disparity"){
      this.setState({type: e.target.value});
      this.drawDisparity(this.state.data, w ,h, [], this.state.sorted_data);
    }
  }

  setAlgorithm(e){
    this.setState({algorithm: e.target.value});
  }

  getAnimations(rand_arr){
    const algo = this.state.algorithm;
    if(algo === "insertion") return getInsertionSortAnimations(rand_arr);
    if(algo === "merge") return getMergeSortAnimations(rand_arr);
    if(algo === "quick") return getQuickSortAnimations(rand_arr);
    if(algo === "dualquick") return getDualQuickSortAnimations(rand_arr);
    if(algo === "selection") return getSelectionSortAnimations(rand_arr);
    if(algo === "heap") return getMaxHeapSortAnimations(rand_arr);
    if(algo === "tim") return getTimSortAnimations(rand_arr);
  }


  startAnimate(){
    const rand_arr = this.state.data;
    const h = this.state.height;
    const w = this.state.width;
    var start = Date.now();
    const animations = this.getAnimations(rand_arr.slice());
    var end = Date.now();
    var time = parseFloat(end - start);
    console.log("animation length", animations.length, "time", time);
    const that = this;
    waitStartAnimate(that, rand_arr, w, h, animations, time) // awaits setting state then starts animation
  }

  animate(rand_arr, w, h, animations, cur_index){
    if(this.state.running !== false && animations[cur_index] !== undefined){
      var selected = null;
      if(animations[cur_index].swap !== null && animations[cur_index].swap !== undefined){
        const [i,j] = animations[cur_index].swap;
        const temp = rand_arr[i];
        const temp2 = rand_arr[j];
        rand_arr[i] = temp2;
        rand_arr[j] = temp;

      }
      if(animations[cur_index].set !== null && animations[cur_index].set !== undefined){
        rand_arr[animations[cur_index].set[0]] = animations[cur_index].set[1];
      }
      if(animations[cur_index].select !== null &&
                  animations[cur_index].select !== undefined){
                    selected = animations[cur_index].select;
                  }
      this.draw(rand_arr, w, h, selected, this.state.sorted_data);
      // continue animation when possible
      if(cur_index < animations.length) requestAnimationFrame( () => {
                                            this.animate(rand_arr, w, h, animations, cur_index+1)})
      }
      else{
        this.setState({running:false});
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
          <div className = "infoBox" hidden = {this.state.running === true}>
          <p> Data Elements
            <input disabled = {this.state.running === true}
            onChange = {(e) => this.updateElements(e)}
              type = "range"
              min = {this.state.min_el}
              max = {this.state.max_el}
              value = {this.state.num_el}>
            </input> {this.state.num_el}
            <button
            onClick = {() => this.resetData()}
            disabled = {this.state.running === true}>
               Reset
             </button>
          </p>
          <p> Visualization type:
            <select onChange= {(e) => this.changePlotType(e)}
                    value = {this.state.type}>
              <option value="scatter"> Scatter Plot</option>
              <option value="swirl"> Swirl Dots</option>
              <option value = "disparity"> Disparity Dots </option>
            </select>
          </p>
          <p>
            Algorithm
              <select disabled = {this.state.running === true}
              onChange = {(e) => this.setAlgorithm(e)}>
              <optgroup label = "Insertion Family">
                <option value = "insertion"> Insertion Sort</option>
                <option disabled = {true}> Binary Insertion Sort</option>
              </optgroup>
              <optgroup label = "Merge Family">
                <option value = "merge"> Merge Sort </option>
                <option disabled = {true}> In-Place Merge Sort</option>
              </optgroup>
              <optgroup label = "Selection Family">
                <option value = "selection"> Selection Sort </option>
                <option value = "heap"> Max-Heap Sort </option>
              </optgroup>
              <optgroup label = "Exchange Family">
                <option value = "quick"> Quick Sort </option>
                <option disabled = {true}> Stable Quick Sort </option>
                <option value = "dualquick"> Dual Pivot Quick Sort</option>
              </optgroup>
              <optgroup label = "Non-Comparison Family">
                <option disabled = {true}> Radix LSD Sort, Base 4</option>
                <option disabled = {true}> Radix MSD Sort, Base 8</option>
                <option disabled = {true}> In Place Radix LSD Sort, Base 16</option>
              </optgroup>
              <optgroup label = "Hybrids">
                <option disabled = {true}> Binary Merge Sort </option>
                <option value = "tim"> TimSort </option>
                <option disabled = {true}> IntroSort </option>
              </optgroup>
              </select>
          </p>
          <p> Language
            <select disabled = {this.state.running === true}>
            <option> Javascript</option>
            <option disabled = {true}> C++ </option>
            </select>
          </p>
          <button
          onClick = {() => this.startAnimate()}
          disabled = {this.state.running === true}>
          Sort!
          </button>
          </div>
        </Draggable>
        <Draggable>
          <div className = "animationControls" hidden = {this.state.running === false}>
            <button> -inf </button>
            <button> -1 </button>
            <button> Start/Pause </button>
            <button
            onClick = {() => this.clearAnimations()}>
              Stop
            </button>
            <button> +1 </button>
            <button> +inf </button>
            <p> Visualization type:
              <select onChange= {(e) => this.changePlotType(e)}
                      value = {this.state.type}>
                <option value= "scatter"> Scatter Plot</option>
                <option value= "swirl"> Swirl Dots</option>
                <option value ="disparity"> Disparity Dots </option>
              </select>
            </p>
            <div> Real sorting time (with animations) <b> {this.state.realTime} ms</b> </div>
            <div> <b>{this.state.comparisons}</b> Comparisons </div>
            <div> <b>{this.state.swaps}</b> Swaps </div>
            <div> <b>{this.state.mainWrites}</b> Writes to Main Array </div>
            <div> <b>{this.state.auxWrites}</b> Writes to Auxiliary Array </div>
          </div>
        </Draggable>
        <canvas ref = {this.canvas} className = "sortCanvas"></canvas>
        <a className = "githubLink"
        href = "https://github.com/alexandreLamarre/SortVisualizer"
        target = "_blank">
          <img src ={githubLink}
          className = "githubLinkImg">
          </img>
        </a>

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

async function waitStartAnimate(that, rand_arr, w, h, animations, time){
  await that.setState({running:true,
    mainWrites: 0, auxWrites: 0,
    comparions: 0, realTime:time,
    swaps: 0});
  that.animate(rand_arr, w, h, animations, 0);
}

function quickSorted(arr, l, r){
  if(l < r){
    var pivot = partitioned(arr, l, r);

    quickSorted(arr, l, pivot -1);
    quickSorted(arr, pivot+1, r);
  }
}

/**

**/
function partitioned(arr, l, r){
  var pivot = arr[r];

  let i = l - 1;
  for(let j = l; j <= r-1; j++){
    if(arr[j] < pivot){
      i++;
      //swap array[i] and array[j]
      const temp = arr[j];
      const temp2 = arr[i];
      arr[j] = temp2;
      arr[i] = temp;
    }
  }
  //swap array[i+1] and arr[r]
  const temp = arr[i+1];
  const temp2 = arr[r];
  arr[i+1] = temp2;
  arr[r] = temp;
  return (i + 1)
}

/**
Assigns a input value in the continuous range 0 to 1, to
a continuous color gradient
@param value the data value to be converted to color
**/
function assignColorGradient(value){
  if(value <0.33){
    const r = 255 - (value)*3*255;
    const g = value*3*255;
    const b = 0;
    return "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
  }
  else if(value < 0.67){
    const r = 0;
    const g = 255 - (value -0.33)*3*255;
    const b = (value -0.33)*3*255;
    return "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
  }
  else{
    const r = (value-0.67)*3*255;
    const g = 0;
    const b = 255 - (value - 0.67)*3*255;
    return "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
  }
}
