import GLM from "../GLManager";
import Shader from "../Shaders/ModelShader";

export default class ModelRenderer{
  constructor(){
    this.shader = new Shader();
    this.models = {};
  }

  registerNewModel = (model, id) => {
    if(!this.models[id]){
      this.models[id] = {
        type:model,
        instances: [],
      }
    }
  }

  addInstance = (instance, id) => {
    this.models[id].instances.push(instance);
  }

  preRender = () => {
    GLM.viewport();
    GLM.depthTest(true);
  }

  render = () => {
    this.preRender();
    this.shader.use();
    Object.keys(this.models).forEach(model => {
      this.models[model].type.use(this.shader);
      this.models[model].instances.forEach(instance => {
        GLM.drawTriangles(this.models[model].type.indices.length);
      })
    })
  }
}
