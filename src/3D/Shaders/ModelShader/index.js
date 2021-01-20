import GLM from "../../GLManager";
import VertexSource from "./vertex";
import FragmentSource from "./fragment";
import Locations from "./locations";

export default class ModelShader{
  constructor(){
    const vertexShader = GLM.createVertexShader();
    GLM.addShaderSource(vertexShader, VertexSource);
    GLM.compileShader(vertexShader);

    const fragmentShader = GLM.createFragmentShader();
    GLM.addShaderSource(fragmentShader, FragmentSource);
    GLM.compileShader(fragmentShader);

    const program = GLM.createShaderProgram();
    GLM.attachShaderToProgram(program, vertexShader);
    GLM.attachShaderToProgram(program, fragmentShader);
    GLM.linkProgram(program);

    this.positionAttribute = GLM.getAttribLocation(program, Locations.POSITION);
    this.program = program;
  }

  use() {
    GLM.useProgram(this.program)
  };

  enablePosition = () => {
    GLM.enableVertexAttribArray(this.positionAttribute);
    GLM.pointToAttribute(this.positionAttribute, 3);
  }
}
