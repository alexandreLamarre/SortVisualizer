import GLM from "../../GLManager";

export default class ModelType{
  constructor(vertices, indices){
    this.vertices = vertices;
    this.indices = indices;
    this._allocateVertexBuffer();
    this._allocateIndexBuffer();
  }

  _allocateVertexBuffer(){
    this.vertexBuffer = GLM.createBuffer();
    GLM.bindArrayBuffer(this.vertexBuffer);
    GLM.addArrayBufferData(this.vertices);
    GLM.unbindArrayBuffer();
  }

  _allocateIndexBuffer(){
    this.indexBuffer = GLM.createBuffer();
    GLM.bindElementArrayBuffer(this.indexBuffer);
    GLM.addElementArrayBufferData(this.indices);
    GLM.unbindElementArrayBuffer();
  }

  use = (shader) => {
    GLM.bindArrayBuffer(this.vertexBuffer);
    shader.enablePosition();
    GLM.bindElementArrayBuffer(this.indexBuffer);
  }
}
