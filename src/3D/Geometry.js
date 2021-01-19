class Geometry{
  constructor(faces){
    this.faces = faces || [];
  }

  vertexCount(){
    return this.faces.length * 3;
  }

  positions(){
    var p = [];
    for(let i = 0; i < this.faces.length; i++){
      var v = this.faces[i].position;
      p.push(v.x, v.y, v.z);
    }

    return p;
  }

  normals(){
    var n = [];
    for(let i = 0; i < this.faces.length; i++){
      var v = this.faces[i].normal;
      n.push(v.x,v.y,v.z);
    }

    return n;
  }

  uvs(){
    var u = [];
    for(let i = 0; i < this.faces.length; i++){
      var v = this.faces[i].uv;
      answer.push(v.x, v.y);
    }

    return u;
  }
}
