/**
GPU Buffer for data in webgl
**/
class VBO{
  constructor(gl, data, count){
    var bufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    this.gl = gl;
    this.size = data.length/count;
    this.count = count;
    this.data = bufferObject;
  }

  destroy(){
    this.gl.deleteBuffer(this.data);
  }
}

class Mesh{
  constructor(gl, geometry){
    var vertexCount = geometry.vertexCount();
    this.positions = new VBO(gl, geometry.positions(), vertexCount);
    this.normals = new VBO(gl, geometry.normals(), vertexCount);
    this.uvs = new VBO(gl, geometry.uvs(), vertexCount);
    this.vertexCount = vertexCount;
    this.position = new Transformation();
    this.gl = gl;
  }

  destroy(){
    this.positions.destroy();
    this.normals.destroy();
    this.uvs.destroy();
  }

}
