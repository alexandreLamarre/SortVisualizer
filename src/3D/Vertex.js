class Vertex{
  constructor(position, normal, uv){
    this.position = position || new Vector3();
    this.normal = normal || new Vector3();
    this.uv = uv || new Vector2();
  }
}


class Vector3(){
  constructor(x,y,z){
    this.x = Number(x) || 0;
    this.y = Number(y) || 0;
    this.z = Number(z) || 0;
  }
}

class Vector2(){
  this.x = Number(x) || 0;
  this.y = Number(y) || 0;
}
