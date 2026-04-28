import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

// Talent nodes distributed on sphere surface
const TALENTS = [
  { id: 1, label: 'Singer', name: 'Aria Cole', emoji: '🎤', theta: 0.5, phi: 1.2 },
  { id: 2, label: 'DJ', name: 'DJ Pulse', emoji: '🎧', theta: 2.1, phi: 0.8 },
  { id: 3, label: 'Influencer', name: 'Nora Bliss', emoji: '✨', theta: 4.2, phi: 1.5 },
  { id: 4, label: 'Celebrity', name: 'Kai Voss', emoji: '⭐', theta: 1.0, phi: 2.2 },
  { id: 5, label: 'Model', name: 'Luna Faye', emoji: '💎', theta: 3.5, phi: 0.5 },
  { id: 6, label: 'Comedian', name: 'Dev Spark', emoji: '😄', theta: 5.5, phi: 1.8 },
  { id: 7, label: 'Dancer', name: 'Zara Flow', emoji: '💃', theta: 2.8, phi: 2.6 },
  { id: 8, label: 'Actor', name: 'Axel Reed', emoji: '🎬', theta: 0.2, phi: 0.3 },
  { id: 9, label: 'Musician', name: 'Ray Storm', emoji: '🎸', theta: 1.8, phi: 1.9 },
  { id: 10, label: 'Podcaster', name: 'Mia Talks', emoji: '🎙️', theta: 4.8, phi: 1.1 },
  { id: 11, label: 'Chef', name: 'Marco T.', emoji: '👨‍🍳', theta: 3.1, phi: 0.9 },
  { id: 12, label: 'Athlete', name: 'Jake Run', emoji: '🏆', theta: 5.0, phi: 2.3 },
];

function sphericalToCartesian(radius: number, theta: number, phi: number) {
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ── Hollow Wireframe Sphere ───────────────────────────────────────────
function WireframeSphere({ isHovered }: { isHovered: boolean }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const speed = isHovered ? 1.4 : 0.3;
    [outerRef, innerRef].forEach((ref) => {
      if (!ref.current) return;
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.x += delta * speed * 0.3;
    });
    if (ringRef1.current) ringRef1.current.rotation.z += delta * (isHovered ? 0.8 : 0.15);
    if (ringRef2.current) ringRef2.current.rotation.x += delta * (isHovered ? 0.6 : 0.1);
  });

  return (
    <group>
      {/* Outer wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[2.4, 3]} />
        <meshBasicMaterial color="#683995" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Inner wireframe — slightly smaller, different phase */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.9, 2]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Equatorial ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.4, 0.008, 8, 100]} />
        <meshBasicMaterial color="#683995" transparent opacity={0.5} />
      </mesh>

      {/* Equatorial ring 2 — tilted */}
      <mesh ref={ringRef2} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[2.4, 0.006, 8, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </mesh>

      {/* Center glow sphere */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#683995" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ── Talent Dot on Sphere Surface ────────────────────────────────────
function TalentNode({ talent }: { talent: typeof TALENTS[0] }) {
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => sphericalToCartesian(2.4, talent.theta, talent.phi), [talent.theta, talent.phi]);

  return (
    <group position={pos}>
      {/* Dot */}
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshBasicMaterial color={hovered ? '#683995' : '#a78bfa'} />
      </mesh>
      {/* Label */}
      <Html
        center
        distanceFactor={7}
        style={{ pointerEvents: hovered ? 'auto' : 'none' }}
      >
        <div
          className={`transition-all duration-300 ${hovered ? 'opacity-100 scale-100' : 'opacity-60 scale-90'}`}
          style={{
            background: hovered ? '#683995' : 'rgba(255,255,255,0.85)',
            color: hovered ? '#fff' : '#683995',
            padding: '4px 10px',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: 700,
            fontFamily: 'Outfit, sans-serif',
            whiteSpace: 'nowrap',
            border: '1.5px solid rgba(104,57,149,0.2)',
            boxShadow: hovered ? '0 4px 20px rgba(104,57,149,0.3)' : 'none',
            backdropFilter: 'blur(8px)',
            letterSpacing: '0.04em',
            userSelect: 'none',
          }}
        >
          {talent.emoji} {talent.label}
        </div>
      </Html>
    </group>
  );
}

// ── Main Globe Group (rotates together) ─────────────────────────────
function Globe({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const rotY = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const speed = isHovered ? 1.4 : 0.25;
    rotY.current += delta * speed;
    groupRef.current.rotation.y = rotY.current;
  });

  return (
    <group ref={groupRef}>
      <WireframeSphere isHovered={isHovered} />
      {TALENTS.map((t) => (
        <TalentNode key={t.id} talent={t} />
      ))}
    </group>
  );
}

// ── Canvas Export ────────────────────────────────────────────────────
export default function SphericalGlobe() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
        <ambientLight intensity={0.8} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#683995" />
        <pointLight position={[-5, -3, -5]} intensity={0.6} color="#a78bfa" />
        <Globe isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
