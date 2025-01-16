'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function Scene() {
  const [scene, setScene] = useState();

  const loader = new GLTFLoader();
  loader.load(
    'http://localhost:4321/gim.glb',
    ({ scene }) => {
      setScene(scene);
    },
    () => {},
  );

  return (
    <Suspense>
      <Canvas>{scene && <primitive object={scene} />}</Canvas>
    </Suspense>
  );
}
