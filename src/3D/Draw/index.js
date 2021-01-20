import GLM from "../GLManager";
import ModelRenderer from "../Renderer/ModelRenderer";
import ModelType from "../Models/ModelType";

export default (gl) => {
  console.log(gl);
  GLM.init(gl);

  const vertices = [
    0.0, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0
  ];

  const indices = [0, 1, 2];
  const modelRenderer = new ModelRenderer();
  modelRenderer.registerNewModel(new ModelType(vertices, indices), "triangle");
  modelRenderer.addInstance("Instance1", "triangle");
  GLM.clear(1.0, 0.0, 0.0, 1.0);
  modelRenderer.render();
}
