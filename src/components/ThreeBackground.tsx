import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box } from '@react-three/drei';

const FloatingGeometry: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <Float
      speed={1}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh position={position}>
        {Math.random() > 0.5 ? (
          <Sphere args={[0.1]}>
            <meshStandardMaterial color="#ff0000" opacity={0.6} transparent />
          </Sphere>
        ) : (
          <Box args={[0.15, 0.15, 0.15]}>
            <meshStandardMaterial color="#ff0000" opacity={0.4} transparent wireframe />
          </Box>
        )}
      </mesh>
    </Float>
  );
};

const ThreeBackground: React.FC = () => {
  const geometries = [];
  
  for (let i = 0; i < 15; i++) {
    geometries.push(
      <FloatingGeometry
        key={i}
        position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5,
        ]}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-5 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff0000" />
          {geometries}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;