import Triangle from "./triangle.js";

/**
Class containing the triangulations
of specific data set
**/
export default class Triangulation{
  constructor(vertices){
    this.vertices = !(vertices)? []: vertices;
    this.triangles = [];
  }

  constructTriangle(v1,v2,v3){
    const t = new Triangle(v1,v2,v3);
    this.triangles.append(t);
  }
}
