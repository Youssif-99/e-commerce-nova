"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export default function SpaceBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      className="absolute inset-0"
    >
      <color attach="background" args={["#020617"]} />
      <Stars radius={100} depth={50} count={6000} factor={4} fade speed={1.2} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 2]} intensity={1} />
    </Canvas>
  );
}

