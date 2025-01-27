'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
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
      const startTime = new Date();

      const animate = () => {
        const timer = new Date() - startTime;
        setGimPosition([
          0,
          -(1 + Math.exp(-timer * 0.005) * 2) * // Fancy math function for bounce in
            Math.cos(-timer * 0.003) * // Bounce period
            0.2,
          0,
        ]);
        if (timer < fadeInDuration) setGimOpacity(timer / fadeInDuration);
        requestAnimationFrame(animate);
      };
      animate();
    });
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8">
      <div className="relative cursor-default">
        <h1 className="z-20 text-center text-8xl font-black tracking-tighter text-purple-900">
          MIT GAME DEVELOPERS GUILD
        </h1>
      </div>

      <div className="h-96 w-96" style={{ opacity: gimOpacity }}>
        <Canvas
          camera={{
            position: [20, 10, 20],
            zoom: 1.5,
            fov: 20,
          }}
        >
          <directionalLight position={[2, 2, 2]} intensity={4} />
          <directionalLight position={[-2, -2, -2]} intensity={2} />

          <mesh position={gimPosition}>
            {scene && <primitive object={scene} />}
          </mesh>

          {/* <OrbitControls zoomSpeed={0.5} /> */}
        </Canvas>
      </div>
    </div>
  );
}
