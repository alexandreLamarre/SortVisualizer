import Transformation from "./Transformation.js"

class Camera{
  constructor(){
    this.position = new Transformation();
    this.projection = new Transformation();
  }

  setOrthographic(width, height, depth){
    this.projection = new Transformation();
    this.projection = this.projection.scale(2/width, 2/height, -2/depth);
  }

  setPerspective(veticalFov, aspectRatio, rmin, rmax){
    var height_div_2n = Math.tan(verticalFov * Math.PI/360);
    var width_div_2n = aspectRatio * height_div_2n;
    this.projection = new Transformation();
    this.projection.fields[0] = 1/ height_div_2n;
    this.projection.fields[5] = 1/width_div_2n;
    this.projection.fields[10] = (rmin + rmax)/(rmin - rmax);
    this.projection.fields[14] = 2*(rmin*rmax)/(rmin- rmax);
    this.projection.fields[15] = 0;
  }

  getInversePosition(){
    var orig = this.position.fields;
    var dest = new Transformation();
    var x = orig[12];
    var y = orig[13];
    var z = orig[14];
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        dest.fields[i*4 + j] = orig[i+j*4]
      }
    }
    //translating by -p will apply R transpose === R inverse
    return dest.translate(-x, -y, -z);
  }
}
