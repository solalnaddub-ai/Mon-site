import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { FocusObject } from './FocusObject';

/**
 * WebGL hero canvas. Lazy-loaded from the Hero section so Three.js stays out
 * of the initial bundle. Renders a static CSS fallback when WebGL is missing
 * (brief: "Prévoir des fallbacks pour les navigateurs sans support WebGL").
 */
function webglAvailable(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

function Fallback() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <div className="h-48 w-48 animate-pulse-glow rounded-none border-2 border-neon-cyan shadow-glow-cyan" />
    </div>
  );
}

export default function HeroScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  if (!webglAvailable()) return <Fallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#22d3ee" />
        <pointLight position={[-5, -3, 2]} intensity={30} color="#e11d8f" />
        <pointLight position={[0, 4, -4]} intensity={20} color="#a855f7" />
        <Float
          speed={reducedMotion ? 0 : 1.4}
          rotationIntensity={reducedMotion ? 0 : 0.4}
          floatIntensity={reducedMotion ? 0 : 0.6}
        >
          <FocusObject reducedMotion={reducedMotion} />
        </Float>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
