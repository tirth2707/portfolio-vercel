import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skillCategories, skillNodes } from '../../data/skillNodes';

const nodePositions = [
  [-2.55, 1.05, 0.1],
  [-1.3, -1, -0.15],
  [0.1, 1.55, 0.25],
  [1.35, -0.88, 0.2],
  [2.5, 0.85, -0.1],
  [0.85, 0.08, 0.5],
];

const SignalLine = ({ point, color }) => {
  const geometry = useMemo(() => {
    const nextGeometry = new THREE.BufferGeometry();
    nextGeometry.setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(point[0], point[1], point[2]),
    ]);
    return nextGeometry;
  }, [point]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.44} />
    </line>
  );
};

const SignalField = () => {
  const points = useMemo(() => {
    const vertices = [];
    for (let index = 0; index < 120; index += 1) {
      const angle = index * 0.72;
      const radius = 1.2 + (index % 18) * 0.11;
      vertices.push(
        Math.cos(angle) * radius,
        Math.sin(index * 0.33) * 1.35,
        Math.sin(angle) * radius - 0.35,
      );
    }
    return new Float32Array(vertices);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#67e8f9" size={0.025} transparent opacity={0.72} />
    </points>
  );
};

const Core = () => {
  const coreRef = useRef(null);
  const outerRef = useRef(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.18;
      coreRef.current.rotation.y += delta * 0.24;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.05;
      outerRef.current.rotation.z -= delta * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#a5f3fc"
          emissive="#22d3ee"
          emissiveIntensity={0.95}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh ref={outerRef} rotation={[Math.PI / 2.45, 0, 0]}>
        <torusGeometry args={[1.22, 0.012, 12, 96]} />
        <meshBasicMaterial color="#34d399" />
      </mesh>
      <mesh rotation={[0, Math.PI / 2.7, 0]}>
        <torusGeometry args={[1.5, 0.008, 12, 96]} />
        <meshBasicMaterial color="#fb7185" />
      </mesh>
    </group>
  );
};

const SkillNode = ({ color, position, delay }) => {
  const nodeRef = useRef(null);

  useFrame(({ clock }) => {
    if (!nodeRef.current) return;
    nodeRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.15 + delay) * 0.07;
  });

  return (
    <group ref={nodeRef} position={position}>
      <mesh>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.13} />
      </mesh>
    </group>
  );
};

const LabScene = () => {
  const categoryColor = useMemo(
    () =>
      skillCategories.reduce((acc, category) => {
        acc[category.id] = category.color;
        return acc;
      }, {}),
    [],
  );
  const sceneRef = useRef(null);
  const featuredNodes = skillNodes.slice(0, nodePositions.length);

  useFrame((_, delta) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <>
      <color attach="background" args={['#050816']} />
      <ambientLight intensity={1.4} />
      <directionalLight position={[2.8, 3.2, 3.8]} intensity={2.2} color="#a5f3fc" />
      <pointLight position={[-2.8, -1.8, 2.8]} intensity={8} color="#34d399" />
      <group ref={sceneRef} position={[0.85, 0.05, 0]}>
        <SignalField />
        <Core />
        {nodePositions.map((point, index) => (
          <SignalLine
            key={`${point.join('-')}-${index}`}
            point={point}
            color={index % 2 === 0 ? '#22d3ee' : '#34d399'}
          />
        ))}
        {featuredNodes.map((node, index) => (
          <SkillNode
            key={node.id}
            position={nodePositions[index]}
            color={categoryColor[node.category] || '#22d3ee'}
            delay={index * 0.66}
          />
        ))}
      </group>
    </>
  );
};

const CloudLabScene = () => (
  <Canvas
    className="h-full w-full"
    camera={{ position: [0, 0.1, 5.4], fov: 48 }}
    dpr={[1, 1.25]}
    gl={{ antialias: true, preserveDrawingBuffer: true, powerPreference: 'default' }}
    fallback={
      <div className="h-full w-full bg-[radial-gradient(circle_at_center,#123244,#050816_64%)]" />
    }
  >
    <LabScene />
  </Canvas>
);

export default CloudLabScene;
