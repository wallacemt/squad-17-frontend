"use client";
"use no memo";

import { Canvas } from "@react-three/fiber";
import {
  Center,
  ContactShadows,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useMemo } from "react";
import { ACESFilmicToneMapping, Mesh, MeshStandardMaterial } from "three";

const elementPath = "/models/oscar_trophy.glb";

function OscarTrophyModel() {
  const { scene } = useGLTF(elementPath);
  const modelScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof Mesh && child.material instanceof MeshStandardMaterial) {
        child.material = child.material.clone();
        // reduz metalness para o material responder à luz direta
        child.material.metalness = 0.55;
        child.material.roughness = 0.25;
        child.material.needsUpdate = true;
      }
    });
    return clone;
  }, [scene]);

  return (
    <Center scale={2.5}>
      <primitive object={modelScene} />
    </Center>
  );
}

export function CinemaCore3D() {
  return (
    <div className="h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.5,40], fov: 35 }}
        dpr={[1, 1.35]}
        gl={{
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 2.0,
        }}
      >
        <hemisphereLight args={["#ffe0a0", "#7a4a00", 2.5]} />

        <spotLight
          position={[3, 6, 4]}
          angle={0.35}
          penumbra={0.8}
          intensity={10}
          color="#ffd580"
        />

        <spotLight
          position={[-4, 2, 3]}
          angle={0.3}
          penumbra={0.9}
          intensity={6}
          color="#a8d4ff"
        />

        <pointLight position={[0, 2, -3]} intensity={4} color="#ff9b42" />
        <pointLight position={[0, -1, 2]} intensity={3} color="#fff5e0" />

        <pointLight position={[0, -3, 1]} intensity={6} color="#ffc84a" />
        <pointLight position={[1, -2.5, 0]} intensity={4} color="#ffe0a0" />
        <pointLight position={[-1, -2.5, 0]} intensity={4} color="#ffe0a0" />

        <Suspense fallback={null}>
          <OscarTrophyModel />
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.45}
            scale={6}
            blur={2.2}
            far={4}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={100}
          maxDistance={200}
          autoRotate
          autoRotateSpeed={1.5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload(elementPath);
