import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh, Group } from 'three';

/**
 * The central immersive 3D object for the hero (brief: "Modèle 3D central
 * avec rotation continue"). An abstract wireframe torus-knot wrapped around a
 * faceted core — reads as a tech-streetwear emblem and is GPU-cheap.
 *
 * Stand-in for a real glTF garment model: drop a <primitive object={gltf} />
 * here later without touching the rest of the scene.
 */
export function FocusObject({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const group = useRef<Group>(null);
  const knot = useRef<Mesh>(null);
  const core = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    if (group.current) {
      // subtle breathing + pointer-reactive tilt
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x = Math.sin(t * 0.4) * 0.15 + state.pointer.y * 0.2;
      group.current.position.y = Math.sin(t * 0.8) * 0.12;
    }
    if (knot.current) knot.current.rotation.z += delta * 0.4;
    if (core.current) core.current.rotation.x -= delta * 0.6;
  });

  return (
    <group ref={group} scale={1.15}>
      {/* faceted neon core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          metalness={0.6}
          roughness={0.25}
          flatShading
        />
      </mesh>

      {/* wireframe knot cage */}
      <mesh ref={knot}>
        <torusKnotGeometry args={[1.7, 0.06, 220, 24, 2, 3]} />
        <meshStandardMaterial color="#fafafa" emissive="#a855f7" emissiveIntensity={0.5} wireframe />
      </mesh>

      {/* outer accent ring */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.3, 0.012, 12, 120]} />
        <meshBasicMaterial color="#f5c518" />
      </mesh>
    </group>
  );
}
