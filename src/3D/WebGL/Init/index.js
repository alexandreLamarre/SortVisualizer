import GLC from '../GLCommander';
import ModelRenderer from '../Render/ModelRenderer';
import ModelType from '../Models/ModelType';
import ModelInstance from '../Models/ModelInstance';
import Cube from './cube';
import Light from '../LightSource';
import Material from '../Materials/material';
import Camera from '../Camera';
import MouseEvent from '../EventHandlers/mouse';

export default (id, data, triangle_indices) => {
    const canvas = document.querySelector(`#${id}`);

    if(!canvas) {
        return;
    }

    const gl = canvas.getContext('webgl');

    if(!gl) {
        return;
    }

    GLC.init(gl);
    MouseEvent.init();

    const vertices = Cube.vertices;
    const indices = Cube.indices;
    console.log("gl data", vertices, indices);
    const normals = [];
    const textureCoords = [];

    const modelRender = new ModelRenderer();
    const light = new Light(100, 100, -100, 1.0, 1.0, 1.0, 0.4);

    const material = new Material();
    material.addDiffuse(require('../resources/testimage.png'));

    const modelType = new ModelType(vertices, indices);
    modelType.addMaterial(material);

    modelRender.registerNewModel(modelType, 'cube');

    const camera = new Camera();

    const instance = new ModelInstance(0, 0, 0, 0, 0.5, 0.5, 0.5);
    modelRender.addInstance(instance, 'cube');

    const render = () => {
        GLC.clear(1.0, 1.0, 1.0, 1.0);
        instance.updateRotation(0, 0, 0);
        modelRender.render(light, camera);
        window.requestAnimationFrame(render);
    }


    window.requestAnimationFrame(render);
}
