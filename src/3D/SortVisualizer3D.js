import React from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import Delaunay from "./DelaunayTriangulation";
import "./SortVisualizer3D.css";

require("react-dom");
window.React2 = require("react");
console.log("One version of React?",window.React1 === window.React2);

var Y_AXIS = new THREE.Vector3(0,1,0);
var X_AXIS = new THREE.Vector3(1,0,0);
var Z_AXIS = new THREE.Vector3(0,0,1);
const CENTER = [0.5, 0.5, 0.5]
var ANGLE_X = Math.PI/4;
var ANGLE_Y = Math.PI/4;
var ANGLE_Z = 0;
var R = 2;


class SortVisualizer3D extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      width: 0, height: 0,
      angleX: 0,
      angleY: 0,
      num_el: 2048,
      data: [],
      heuristic: "x+y",
    }

    this.canvas = React.createRef();

  }

  componentDidMount(){
    const w = window.innerWidth;
    const h = window.innerHeight*0.95;
    const canvas = this.canvas.current;
    canvas.width = w;
    canvas.height = h;
    this.setState({width: w, height: h});

    const positions = [];
    const indices = [];
    const range = 512;
    var zMin = Infinity;
    var zMax = -Infinity;
    var iMin = Infinity;
    var iMax = -Infinity;
    for(let i = 0; i < range; i++){
        positions.push([parseInt(Math.random()*range), parseInt(Math.random()*range), null]);
        positions[i][2] = this.hEval(positions[i][0], positions[i][1]);
        const index_heuristic = this.hEval(i, i);
        if(index_heuristic > iMax) iMax = index_heuristic;
        if(index_heuristic < iMin) iMin = index_heuristic;
        if(positions[i][2] > zMax) zMax = positions[i][2];
        if(positions[i][2] < zMin) zMin = positions[i][2];
    }

    console.log("zmin,zmax", zMin, zMax);

    //Setting up THREE.js Renderer
    var [renderer, scene, camera] = this.setupNewScene(this.canvas.current, w, h);

    this.draw3D(positions, renderer, scene, camera, range, zMin, zMax, iMin, iMax);
    this.setState({scene: scene,
      camera: camera,
      renderer: renderer,
      data: positions,
      width: w,
      height: h,
      zMin: zMin,
      zMax: zMax,
      iMin: iMin,
      iMax: iMax,
    });

  }

  setupNewScene(canvas, w, h){
    var renderer = new THREE.WebGLRenderer({canvas: canvas, alpha:true});
    renderer.setSize(w, h);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
    var pointLight = new THREE.PointLight( 0xffffff , 1);
    camera.position.set(1,1, 1.5);
    pointLight.position.set(1,1,2);
    camera.add(pointLight)
    camera.lookAt(new THREE.Vector3(...CENTER));
    scene.add(camera);
    renderer.render(scene, camera);
    return [renderer, scene, camera];
  }

  draw3D(positions, renderer, scene, camera, range, zMin, zMax, iMin, iMax){
    //draw main axis in red
    var material = new THREE.LineBasicMaterial({color:0xff0000});
    var x_axis = [new THREE.Vector3(0,0,0), new THREE.Vector3(1,0,0)];
    var y_axis = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0)];
    var z_axis = [new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,1)];

    var geometry1 = new THREE.BufferGeometry().setFromPoints(x_axis);
    var geometry2 = new THREE.BufferGeometry().setFromPoints(y_axis);
    var geometry3 = new THREE.BufferGeometry().setFromPoints(z_axis);

    var line1 = new THREE.Line(geometry1, material);
    var line2 = new THREE.Line(geometry2, material);
    var line3 = new THREE.Line(geometry3, material);

    scene.add(line1);
    scene.add(line2);
    scene.add(line3);


    //draw delaunay triangulation wire frame

    const positionsInSortOrder= this.sortOrder(positions, range, iMin, iMax)
    const triangles = Delaunay.from(positionsInSortOrder).triangles;
    const coords = this.createCoordinates(positions, range, zMin, zMax, iMin, iMax);
    const lines = [];

    for(let i = 0; i < triangles.length; i +=3){
      var material = new THREE.LineBasicMaterial({color:0xffffff});

      // fetch the 3 vertices of the triangle
      const v1 = triangles[i];
      const v2 = triangles[i+1];
      const v3 = triangles[i+2];

      var edge1 = [new THREE.Vector3(...coords[v1]), new THREE.Vector3(...coords[v2])];
      var edge2 = [new THREE.Vector3(...coords[v2]), new THREE.Vector3(...coords[v3])];
      var edge3 = [new THREE.Vector3(...coords[v3]), new THREE.Vector3(...coords[v1])];
      //
      // console.log(edge1, edge2, edge3);
      // set the geometries for each edge
      var geometry1 = new THREE.BufferGeometry().setFromPoints(edge1);
      var geometry2 = new THREE.BufferGeometry().setFromPoints(edge2);
      var geometry3 = new THREE.BufferGeometry().setFromPoints(edge3);

      var line1 = new THREE.Line(geometry1, material);
      var line2 = new THREE.Line(geometry2, material);
      var line3 = new THREE.Line(geometry3, material);

      scene.add(line1);
      scene.add(line2);
      scene.add(line3);
    }



    renderer.render(scene, camera);
  }

  sortOrder(positions, c, imin, imax){
    const arr = [];

    for(let i = 0; i < positions.length; i++){
      const avg = (positions[i][0] + positions[i][1])/(2)
      const heuristic_prediction = this.hEval(i,i)
      arr.push([positions[i][0], positions[i][1]]);
    }

    return arr;

  }

  /**
  @param arr the array (x,y, heuristic(x,y)) that we want to convert
  **/
  createCoordinates(arr, c, fmin, fmax, imin, imax){
    const pos_arr = [];
    for(let i = 0; i < arr.length; i++){
      const avg = (arr[i][0]+arr[i][1])/(2*c) ;
      const fValue = (this.hEval(i,i) -imin)/(imax-imin);
      console.log(this.hEval(i,i))
      console.log(imax)
      console.log(fValue);
      const index = (arr[i][2]-fmin)/(2*(fmax-fmin));
      pos_arr.push(
        [arr[i][1]/c, (arr[i][2]-fmin)/(2*fmax-2*fmin), arr[i][0]/(c) ]
      );
    }
    return pos_arr;
  }

  /**
  evaluate the heuristic on the data values
  **/
  hEval(x,y){
    if(y === 0) return 1;
    return Math.pow(x,2) - Math.pow(y,2)
  }

  rewriteDataValues(arr){
    for(let i = 0; i < arr.length; i++){
      const val = this.hEval(arr[i][0], arr[i][1]);
      arr[i][2] = val;
    }
  }

  startDrag(e){
    e.preventDefault();
    this.state.previousMouseX = e.clientX;
    this.state.previousMouseY = e.clientY;
    this.state.dragging = true;
  }

  /** handles the end of drag events**/
  endDrag(e){
    e.preventDefault();
    this.state.dragging = false;
  }

  /**[MISNOMER] move this camera back and forth based on difference of onMouse
  positions on drags **/
  rotateCamera(e,rot){
    const camera = this.state.camera;
    const center = [0.5, 0.5, 0.5]
    var x = camera.position.x;
    var y = camera.position.y;
    var z = camera.position.z;
    const speed = 0.01;
    const r = calculateRadius(camera.position.x, camera.position.y, camera.position.z, center);
    if(rot< 0){
      camera.position.x = x *Math.cos(speed) + z * Math.sin(speed);
      camera.position.z = z * Math.cos(speed) - x * Math.sin(speed);

    }
    if(rot > 0) {
      camera.position.x = x * Math.cos(speed) - z * Math.sin(speed);
      camera.position.z = z * Math.cos(speed) + x * Math.sin(speed);
    }
    console.log(camera.position)
    camera.lookAt(new THREE.Vector3(...center))
    this.state.renderer.render(this.state.scene, this.state.camera);
  }

  zoomCamera(e){
    const delta = Math.sign(e.deltaY);
    this.state.camera.position.z += 0.1*delta;
    this.state.renderer.render(this.state.scene, this.state.camera);
    console.log(this.state.camera.position);
  }

  render(){
    return (
      <div>
        <canvas ref = {this.canvas} style = {{outline: "1px solid white"}}
        onWheel = {(e) => this.zoomCamera(e)}/>
        <button onMouseDown = {(e) => this.rotateCamera(e, 1)}> Rotate- </button>
        <button onMouseDown = {(e) => this.rotateCamera(e, -1)}> Rotate+ </button>
        {/*<canvas ref = {this.canvas} className = "3Dcanvas"
        style = {{height: this.state.height, width: this.state.width}}></canvas> */}
      </div>
    )
  }
}

export default SortVisualizer3D;

function calculateRadius(x,y,z, center){
  return Math.sqrt(Math.pow(x - center[0],2) + Math.pow(y- center[1],2) + Math.pow(z - center[2], 2));
}
