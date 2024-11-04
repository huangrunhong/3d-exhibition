"use client";

import { Scene } from "@babylonjs/core";
import { useEffect, useRef } from "react";

import createScenePrinter from "core/create-scene-printer";

import "@babylonjs/loaders/glTF";

const Printer = () => {
  const mounted = useRef(false);
  const scene = useRef<Scene>();
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const createAsync = async () => {
      if (mounted.current || !canvas.current) return;

      mounted.current = true;

      canvas.current.width = window.innerWidth;
      canvas.current.height = window.innerHeight;

      scene.current = await createScenePrinter(canvas.current);
    };

    createAsync();
  }, []);

  return <canvas ref={canvas} />;
};

export default Printer;
