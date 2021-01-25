export default class Triangle{
  /** Takes the index of vertices of the triangle it
  represents**/
  constructor(v1, v2, v3){
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
  }

  get(){
    return [this.v1, this.v2, this.v3];
  }
}
