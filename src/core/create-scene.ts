import {
  appendSceneAsync,
  Engine,
  FreeCamera,
  HDRCubeTexture,
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
  const camera = new FreeCamera("camera", new Vector3(6.5, 1.6, 0), scene);
  camera.fov = 0.6;
  camera.speed = 0.5;
  camera.setTarget(new Vector3(0, 1.6, 0));
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
    width: 0.2,
    height: 0.2,
    depth: 0.01,
  });
  manager.addControl(button);
  button.position.x = positionX;
  button.position.y = positionY;
  button.position.z = positionZ;
  // material.alpha = 0.8;
  // material.diffuseColor = new Color3(1, 0, 0); //red

  const content = new GUI.TextBlock();
  content.text = text;
  content.color = "white";
  content.fontSize = 48;
  button.content = content;
  button.pointerEnterAnimation = () => undefined;

  return button;
};

const createScene = async (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });

  const scene = new Scene(engine);

  const hrd = new HDRCubeTexture(
    "/3d-exhibition/berlin.hdr",
    scene,
    128,
    false,
    true,
    false,
    true
  );

  scene.environmentTexture = hrd;

  scene.createDefaultSkybox(hrd, true, 1000);

  setSceneGravity(scene);
  createLight(scene);
  createCamera(scene, canvas);
  // scene.clearColor = new Color4(0.5, 0.8, 1, 1);

  await appendSceneAsync("/3d-exhibition/scene.glb", scene);

  scene.meshes.forEach((mesh) => {
    if (
      mesh.name.startsWith("Ground") ||
      mesh.name.startsWith("Wall") ||
      mesh.name.startsWith("Window") ||
      mesh.name.startsWith("Table") ||
      mesh.name.startsWith("Binder")
    ) {
      mesh.checkCollisions = true;
    }
  });

  scene.animationGroups.forEach((animation) => {
    const manager = new GUI.GUI3DManager(scene);
    const material = new StandardMaterial("buttonMaterial", scene);

    if (animation.name === "Door_entrance") {
      animation.stop();

      const button1 = createButton(1, 1.5, -1.5, manager, material, "OPEN");

      if (button1.node) {
        button1.node.rotation = new Vector3(0, -Math.PI / 2, 0);
      }

      button1.onPointerClickObservable.add(function () {
        animation.start();
        animation.speedRatio = 2;
      });
    }

    if (animation.name === "Door_social space") {
      animation.stop();

      const button2 = createButton(-10, 1.5, 3.15, manager, material, "OPEN");

      button2.onPointerClickObservable.add(function () {
        animation.start();
        animation.speedRatio = 2;
      });
    }
  });

  engine.runRenderLoop(() => scene.render());

  return scene;
};

export default createScene;
