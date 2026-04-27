"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import { Box3, Vector3 } from "three";
import type { Group } from "three";

const elementPath = "/models/oscar_trophy.glb";

function OscarTrophyModel() {
  const rigRef = useRef<Group>(null);
  const { scene } = useGLTF(elementPath);
  const modelScene = useMemo(() => scene.clone(), [scene]);

  const { center, scale } = useMemo(() => {
    modelScene.updateMatrixWorld(true);

    const bounds = new Box3().setFromObject(modelScene);
    const size = new Vector3();
    const modelCenter = new Vector3();

    bounds.getSize(size);
    bounds.getCenter(modelCenter);

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const normalizedScale = 2.7 / maxDimension;

    return {
      center: modelCenter,
      scale: normalizedScale,
    };
  }, [modelScene]);

  useFrame((state, delta) => {
    if (rigRef.current) {
      rigRef.current.rotation.y += delta * 0.36;
      rigRef.current.rotation.x =
        0.08 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      rigRef.current.position.y =
        -0.45 + Math.sin(state.clock.elapsedTime * 1.1) * 0.05;
    }
  });

  return (
    <group ref={rigRef} position={[0, -0.45, 0]} rotation={[0.08, 0.2, 0]}>
      <primitive
        object={modelScene}
        scale={scale}
        position={[-center.x, -center.y, -center.z]}
      />
    </group>
  );
}

export function CinemaCore3D() {
  return (
    <div className="h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0.8, 6.3], fov: 30 }} dpr={[1, 1.35]}>
        <ambientLight intensity={0.24} />

        <spotLight
          position={[2.7, 4.2, 4.8]}
          angle={0.38}
          penumbra={0.75}
          intensity={2.4}
          color="#ffd8a3"
        />

        <spotLight
          position={[-3.5, 1.7, 2.6]}
          angle={0.32}
          penumbra={0.85}
          intensity={1.15}
          color="#7cb7ff"
        />

        <pointLight
          position={[0, 1.4, -3.2]}
          intensity={1.05}
          color="#ff9b42"
        />
        <pointLight
          position={[0, -2.2, 2.2]}
          intensity={0.45}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <OscarTrophyModel />
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.42}
            scale={6.2}
            blur={2.2}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(elementPath);
