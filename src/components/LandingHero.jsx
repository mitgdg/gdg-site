'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Scene() {
  const [scene, setScene] = useState();
  const [gimPosition, setGimPosition] = useState([0, -1, 0]);
  const [gimOpacity, setGimOpacity] = useState(0);

  // Load GIM model on page load
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load('/gim.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        if (!child.isMesh) return;
        child.material.roughness = 0.8; // Increase roughness to make it less shiny
        child.material.metalness = 0; // Decrease metalness
      });
      setScene(gltf.scene);

      const fadeInDuration = 200;
      const rotationLerpFactor = 0.05;
      let lookAtX = 0;
      let lookAtY = 0;

      // Bounce up and down, look at mouse
      let startTime;
      const animate = () => {
        const timer = new Date() - startTime;
        setGimPosition([
          0,
          -(1 + Math.exp(-timer * 0.004) * 1) * // Fancy math function for bounce in
            Math.cos(-timer * 0.003) * // Bounce period
            0.2 -
            0.5,
          0,
        ]);
        if (timer <= fadeInDuration) setGimOpacity(timer / fadeInDuration);
        else setGimOpacity(100);

        gltf.scene.rotation.x =
          (1 - rotationLerpFactor) * gltf.scene.rotation.x +
          lookAtY * rotationLerpFactor;
        gltf.scene.rotation.y =
          (1 - rotationLerpFactor) * gltf.scene.rotation.y +
          lookAtX * rotationLerpFactor;

        requestAnimationFrame(animate);
      };
      setTimeout(() => {
        startTime = new Date();
        animate();
      }, 50);

      // Rotate based on mouse position
      document.onmousemove = (e) => {
        lookAtX = (e.clientX / window.innerWidth - 0.2) * 1;
        lookAtY = (e.clientY / window.innerHeight - 0.5) * 0.5;
      };
    });
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 overflow-hidden px-6 pt-20 md:min-h-screen md:flex-row dark:bg-neutral-900 dark:text-white">
      {/* Intro text */}
      <div className="relative cursor-default md:max-w-md">
        <h1 className="z-20 mb-4 text-5xl font-black leading-[0.9em] tracking-tighter md:text-7xl">
          MIT GAME DEVELOPERS GUILD
        </h1>
        <p>
          we meet in 2-135 from 7 to 9 pm on fridays. come hang out and build
          games with us! sometimes we have snacks too.
        </p>

        <a href="https://github.com/mit-gdg"></a>
      </div>

      {/* Gim!! */}
      <div
        className="-my-16 -ml-10 -mr-16 h-96 w-96 shrink-0"
        style={{ opacity: gimOpacity }}
      >
        <Canvas
          camera={{
            position: [20, 12, 25],
            zoom: 1.8,
            fov: 20,
          }}
        >
          <directionalLight position={[2, 2, 2]} intensity={4} />
          <directionalLight position={[0, 1, 0]} intensity={2} />

          <mesh position={gimPosition}>
            {scene && <primitive object={scene} />}
          </mesh>

          {/* <OrbitControls zoomSpeed={0.5} /> */}
        </Canvas>
      </div>
    </div>
  );
}
