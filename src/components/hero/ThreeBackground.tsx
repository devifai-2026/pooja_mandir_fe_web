import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DIYA_COUNT = 30;
const ASH_COUNT = 100;

function makeGlowTexture(inner: string, outer: string): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.4, inner);
  gradient.addColorStop(1, outer);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function DiyaParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const texture = useMemo(() => makeGlowTexture('rgba(255,214,120,1)', 'rgba(255,107,0,0)'), []);

  const { positions, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(DIYA_COUNT * 3);
    const speeds = new Float32Array(DIYA_COUNT);
    const sizes = new Float32Array(DIYA_COUNT);
    for (let i = 0; i < DIYA_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      speeds[i] = 0.2 + Math.random() * 0.5;
      sizes[i] = 0.25 + Math.random() * 0.35;
    }
    return { positions, speeds, sizes };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < DIYA_COUNT; i++) {
      const y = posAttr.getY(i);
      let newY = y + speeds[i] * 0.006;
      if (newY > 4) newY = -4;
      posAttr.setY(i, newY);
      posAttr.setX(i, posAttr.getX(i) + Math.sin(state.clock.elapsedTime * 0.6 + i) * 0.002);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#FFB74D"
        size={0.55}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AshParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const texture = useMemo(() => makeGlowTexture('rgba(245,240,232,1)', 'rgba(245,240,232,0)'), []);

  const positions = useMemo(() => {
    const positions = new Float32Array(ASH_COUNT * 3);
    for (let i = 0; i < ASH_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < ASH_COUNT; i++) {
      let y = posAttr.getY(i) - 0.003;
      if (y < -5) y = 5;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#F5F0E8"
        size={0.09}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function drawMandalaTexture(): THREE.Texture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const cx = size / 2;
  const cy = size / 2;
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.9)';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';

  // concentric rings
  [230, 200, 150, 100].forEach((r) => {
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // petal spokes
  const petals = 16;
  for (let i = 0; i < petals; i++) {
    const angle = (i / petals) * Math.PI * 2;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -100);
    ctx.quadraticCurveTo(18, -160, 0, -225);
    ctx.quadraticCurveTo(-18, -160, 0, -100);
    ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();
  }

  // inner lotus dots
  const dots = 24;
  for (let i = 0; i < dots; i++) {
    const angle = (i / dots) * Math.PI * 2;
    const r = 60;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function Mandala() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => drawMandalaTexture(), []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0012;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      <mesh>
        <planeGeometry args={[7, 7]} />
        <meshBasicMaterial map={texture} transparent opacity={0.1} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    >
      <Mandala />
      <DiyaParticles />
      <AshParticles />
    </Canvas>
  );
}
