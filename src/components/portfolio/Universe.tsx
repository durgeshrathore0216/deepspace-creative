import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const paletteNames = [
  "metal",
  "wire",
  "shell",
  "particles",
  "ring",
  "emission",
  "key",
  "fill",
] as const;
type ScenePalette = Record<(typeof paletteNames)[number], THREE.Color>;
function readPalette(): ScenePalette {
  const styles = getComputedStyle(document.documentElement);
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  const palette: ScenePalette = {
    metal: new THREE.Color(),
    wire: new THREE.Color(),
    shell: new THREE.Color(),
    particles: new THREE.Color(),
    ring: new THREE.Color(),
    emission: new THREE.Color(),
    key: new THREE.Color(),
    fill: new THREE.Color(),
  };
  for (const name of paletteNames) {
    if (!context) continue;
    context.fillStyle = styles.getPropertyValue(`--scene-${name}`).trim();
    context.fillRect(0, 0, 1, 1);
    const pixel = context.getImageData(0, 0, 1, 1).data;
    palette[name] = new THREE.Color(`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`);
  }
  return palette;
}
function Core({ reduced, palette }: { reduced: boolean; palette: ScenePalette }) {
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
          color={palette.metal}
          metalness={0.85}
          roughness={0.24}
          transparent
          opacity={0.75}
          clearcoat={1}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.46, 3]} />
        <meshBasicMaterial color={palette.wire} wireframe transparent opacity={0.23} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.86, 42, 32]} />
        <meshBasicMaterial color={palette.shell} wireframe transparent opacity={0.14} />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={palette.particles}
          size={0.025}
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.6, i * 0.7, i * 0.8]}>
          <torusGeometry args={[2.05 + i * 0.18, 0.013, 8, 160]} />
          <meshStandardMaterial
            color={palette.ring}
            metalness={0.7}
            roughness={0.25}
            emissive={palette.emission}
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
export default function Universe({ reduced = false }: { reduced?: boolean }) {
  const palette = useMemo(readPalette, []);
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.9], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      frameloop={reduced ? "demand" : "always"}
      aria-label="Rotating three-dimensional AI core"
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={3} color={palette.key} />
      <pointLight position={[-3, -1, 2]} intensity={15} color={palette.fill} />
      <Float speed={reduced ? 0 : 1.2} rotationIntensity={0.1} floatIntensity={0.25}>
        <Core reduced={reduced} palette={palette} />
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
