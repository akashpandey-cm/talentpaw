import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// No more DreiImage — pure geometry only to avoid 404 crashes
function LiquidOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.08;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={3.5}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          color="#683995"
          distort={0.45}
          speed={1.8}
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 600;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#683995" transparent opacity={0.3} />
    </points>
  );
}

export default function VisualHero() {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#683995" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#8b5cf6" />
        <Suspense fallback={null}>
          <LiquidOrb />
          <FloatingParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
