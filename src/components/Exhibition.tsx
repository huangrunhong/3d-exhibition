import {
  appendSceneAsync,
  Color4,
  Engine,
  FreeCamera,
  HemisphericLight,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { useEffect, useRef } from "react";
import * as GUI from "@babylonjs/gui";

import "@babylonjs/loaders/glTF";

let mount = false;

const Exhibition = () => {
  // const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (mount) return;
    if (!canvas.current) return;

    mount = true;

    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    const engine = new Engine(canvas.current, true, {
      preserveDrawingBuffer: true,
      stencil: true,
    });

    const createScene = async () => {
      const scene = new Scene(engine);
      const camera = new FreeCamera("camera1", new Vector3(13, 1.5, 0), scene);
      camera.fov = 0.6;
      camera.setTarget(new Vector3(0, 1.5, 0));
      camera.attachControl(canvas.current, true);

      const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
      light.intensity = 0.7;
      // Enable VR
      await scene.createDefaultXRExperienceAsync();

      scene.clearColor = new Color4(1, 1, 1);

      const manager = new GUI.GUI3DManager(scene);
      const button = (
        positionX: number,
        positionY: number,
        positionZ: number
      ) => {
        const button = new GUI.Button3D("reset", { width: 0.15, height: 0.15 });
        manager.addControl(button);

        button.position.x = positionX;
        button.position.y = positionY;
        button.position.z = positionZ;

        const content = new GUI.TextBlock();
        content.text = "OPEN";
        content.color = "white";
        content.fontSize = 36;
        button.content = content;
        button.pointerEnterAnimation = () => undefined;

        return button;
      };

      await appendSceneAsync("/3d-exhibition/scene.glb", scene);

      scene.animationGroups.forEach((animation) => {
        if (animation.name === "Door_entrance") {
          animation.stop();

          const button1 = button(1, 1.5, -1.5);

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

          const button2 = button(-10, 1.5, 3.15);

          button2.onPointerClickObservable.add(function () {
            animation.start();
            animation.speedRatio = 2;
          });
        }
      });

      return scene;
    };

    const renderScene = async () => {
      const scene = await createScene();
      engine.runRenderLoop(() => scene.render());
    };

    renderScene();
  }, []);

  return <canvas ref={canvas} />;
};

export default Exhibition;
