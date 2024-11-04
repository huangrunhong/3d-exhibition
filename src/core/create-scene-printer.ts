import {
  appendSceneAsync,
  Color3,
  Color4,
  Engine,
  FreeCamera,
  HemisphericLight,
  Scene,
  StandardMaterial,
  Vector3,
} from "@babylonjs/core";

import * as GUI from "@babylonjs/gui";

const setSceneGravity = (scene: Scene) => {
  const assumedFramesPerSecond = 60;
  const earthGravity = -9.81;

  scene.collisionsEnabled = true;
  scene.gravity = new Vector3(0, earthGravity / assumedFramesPerSecond, 0);
};

const setCameraGravity = (camera: FreeCamera) => {
  camera.applyGravity = true;
  camera.checkCollisions = true;
  camera.ellipsoid = new Vector3(1, 1, 1);
};

const createCamera = (scene: Scene, canvas: HTMLCanvasElement) => {
  const camera = new FreeCamera("camera", new Vector3(0, 1.6, 7), scene);
  camera.fov = 0.6;
  camera.speed = 0.5;
  camera.setTarget(new Vector3(0, 1.6, -3));
  camera.attachControl(canvas, true);

  setCameraGravity(camera);

  return camera;
};

const createLight = (scene: Scene) => {
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  light.intensity = 0.7;

  return light;
};

const createButton = (
  positionX: number,
  positionY: number,
  positionZ: number,
  manager: GUI.GUI3DManager,
  material: StandardMaterial,
  text: string
) => {
  const button = new GUI.Button3D("reset", {
    width: 0.3,
    height: 0.2,
    depth: 0.01,
  });
  manager.addControl(button);
  button.position.x = positionX;
  button.position.y = positionY;
  button.position.z = positionZ;
  // material.alpha = 0.8;
  // material.diffuseColor = new Color3(1, 0, 0); //red

  if (button.mesh) {
    // button.mesh.material = material;
    // const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(
    //   button.mesh
    // );
    // advancedTexture.addControl(content);
  }
  const content = new GUI.TextBlock();
  content.text = text;
  content.color = "white";
  content.fontSize = 48;
  button.content = content;
  button.pointerEnterAnimation = () => undefined;

  return button;
};

const createScenePrinter = async (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const scene = new Scene(engine);

  scene.clearColor = new Color4(1, 1, 1, 1);

  setSceneGravity(scene);
  createLight(scene);
  createCamera(scene, canvas);

  await appendSceneAsync("/printer.glb", scene);

  engine.runRenderLoop(() => scene.render());

  return scene;
};

export default createScenePrinter;
