/**
**/
class Transformation{
  /**
  **/
  constructor(){
    this.fields = [1,0,0,0,
                   0,1,0,0,
                   0,0,1,0,
                   0,0,0,1];
  }
  /**
  **/
  translate(x,y,z){
    var t = new Transformation();
    t.fields[12] = Number(x) || 0;
    t.fields[13] = Number(y) || 0;
    t.fields[14] = Number(z) || 0;
    return this.multiply(t);
  }

  scale(x,y,z){
    var t = new Transformation();
    t.fields[0] = Number(x) || 0;
    t.fields[5] = Number(y) || 0;
    t.fields[10] = Number(z) || 0;
    return this.multiply(t);
  }

  rotateX(angle){
    angle = Number(angle) || 0;
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var t = new Transformation();
    t.fields[5] = c;
    t.fields[10] = c;
    t.fields[9] = -s;
    t.fields[6] = s;
    return this.multiply(t);
  }

  rotateY(angle){
    angle = Number(angle) || 0;
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var t = new Transformation();
    t.fields[0] = c;
    t.fields[10] = c;
    t.fields[2] = -s;
    t.fields[8] = s;
    return this.multiply(t);
  }

  rotateZ(angle){
    angle = Number(angle);
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var t = new Transformation();
    t.fields[0] = c;
    t.fields[5] = c;
    t.fields[4] = -s;
    t.fields[1] = s;
    return this.multiply(t);
  }
  /**
  Multiplies transformation matrices to chain transformations
  @param trans the transformation to be chained to the current transformation
  **/
  multiply(trans){
    var output = new Transformation();
    for(let row = 0; row < 4; row++){
      for(let col = 0; col < 4; col++){
        var sum = 0;
        for(var k = 0; k < 4; k++){
          sum += this.fields[k*4+row] * trans.fields[col*4 + k];
        }
        output.fields[col*4 + row] = sum;
      }
    }
    return output;
  }
}
