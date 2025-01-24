'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Scene() {
  const [scene, setScene] = useState();

  const loader = new GLTFLoader();
  loader.load(
    '/gim.glb',
    ({ scene }) => {
      setScene(scene);
    },
    () => {},
  );

  return (
    <Canvas camera={{ position: [20, 10, 20], fov: 20 }}>
      <directionalLight position={[2, 2, 2]} intensity={4} />
      {scene && <primitive object={scene} />}

      {/* <OrbitControls /> */}
    </Canvas>
  );
}
