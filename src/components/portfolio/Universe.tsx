import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Core({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(660 * 3);
    for (let i = 0; i < 660; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 660);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 2.1 + Math.sin(i * 13.7) * 0.12;
      data.set(
        [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi),
        ],
        i * 3,
      );
    }
    return data;
  }, []);
  useFrame((state, delta) => {
    if (reduced) return;
    if (group.current) {
      group.current.rotation.y += delta * 0.13;
      group.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.13 + state.pointer.y * 0.1;
      group.current.rotation.z = state.pointer.x * 0.12;
    }
    if (inner.current) inner.current.rotation.y -= delta * 0.17;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.3,
      0.025,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.2,
      0.025,
    );
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={group} rotation={[0.2, 0, -0.2]}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.42, 3]} />
        <meshPhysicalMaterial
          color="#8baee3"
          metalness={0.85}
          roughness={0.24}
          transparent
          opacity={0.75}
          clearcoat={1}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.46, 3]} />
        <meshBasicMaterial color="#d5e7ff" wireframe transparent opacity={0.23} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.86, 42, 32]} />
        <meshBasicMaterial color="#7198d8" wireframe transparent opacity={0.14} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#5888cf" size={0.025} transparent opacity={0.8} sizeAttenuation />
      </points>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.6, i * 0.7, i * 0.8]}>
          <torusGeometry args={[2.05 + i * 0.18, 0.013, 8, 160]} />
          <meshStandardMaterial
            color="#a9cdfc"
            metalness={0.7}
            roughness={0.25}
            emissive="#4273bb"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
export default function Universe({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.9], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={reduced ? "demand" : "always"}
      aria-label="Rotating three-dimensional AI core"
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={3} color="#f6faff" />
      <pointLight position={[-3, -1, 2]} intensity={15} color="#8abaff" />
      <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.1} floatIntensity={0.25}>
        <Core reduced={reduced} />
      </Float>
      <Stars
        radius={25}
        depth={20}
        count={500}
        factor={1}
        saturation={0}
        fade
        speed={reduced ? 0 : 0.3}
      />
    </Canvas>
  );
}
