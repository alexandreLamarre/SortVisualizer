import Locations from "./locations";

export default `
  attribute vec3 ${Locations.POSITION}

  void main(void){
    gl_Position = vec4(${Locations.POSITION}, 1.0);
  }
`;
