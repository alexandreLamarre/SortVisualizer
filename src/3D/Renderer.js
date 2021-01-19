class Renderer{
  constructor(canvas){
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    gl.enable(gl.DEPTH_TEST);
  }

  setClearColor(r,g,b){
    gl.clearColor(r/255, g/255, b/255, 1);
  }

  getContext(){
    return this.gl;
  }

  render(){
    this.gl.clear(gl.COLOR_BUFFER_BIT | g.DEPTH_BUFFER_BIT);
  }
}
