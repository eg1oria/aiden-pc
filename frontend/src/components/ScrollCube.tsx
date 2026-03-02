'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center, Float } from '@react-three/drei';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

const CONFIG = {
  scale: 0.1,
  offsetX: 1,
  offsetY: -3,

  cameraZ: 8,
  cameraFov: 35,

  floatSpeed: 0.5,
  floatRotation: 0.1,
  floatIntensity: 0.1,

  scroll: {
    yTimes: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0],
    yKeyframes: [4, 3, 3, 3, 4, 4, 2, 2, 3, 4],

    xTimes: [0, 0.1, 0.2, 0.3, 0.45, 0.55, 0.6, 0.7, 0.85, 1.0],
    xKeyframes: [2, -1, -2, -5, -5, -3, 1, 2, 2, 2],

    rotTimes: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9, 1.0],
    rotKeyframes: [
      0,
      Math.PI / 4,
      Math.PI / 2,
      Math.PI,
      Math.PI,
      Math.PI,
      Math.PI,
      Math.PI * 1.5,
      Math.PI * 2,
      Math.PI * 2,
    ],
  },

  wobble: 0,
  spring: { stiffness: 80, damping: 20 },

  ambientIntensity: 3,
  spotIntensity: 50,
  pointIntensity: 100,

  shadow: {
    positionY: -3.5,
    opacity: 0.4,
    scale: 15,
    blur: 2.5,
    far: 4,
  },
};

function Model({ scrollProgress }: { scrollProgress: any }) {
  const { scene } = useGLTF('/lain_li_pc_case.glb');
  const modelRef = useRef<THREE.Group>(null);

  const { scroll, offsetX, offsetY, wobble, spring: sp } = CONFIG;

  const yPos = useTransform(scrollProgress, scroll.yTimes, scroll.yKeyframes);
  const xPos = useTransform(scrollProgress, scroll.xTimes, scroll.xKeyframes);
  const rotation = useTransform(scrollProgress, scroll.rotTimes, scroll.rotKeyframes);

  const smoothY = useSpring(yPos, sp);
  const smoothX = useSpring(xPos, sp);
  const smoothRotation = useSpring(rotation, sp);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        smoothY.get() + offsetY + Math.sin(state.clock.elapsedTime) * wobble;
      modelRef.current.position.x = smoothX.get() + offsetX;
      modelRef.current.rotation.y = smoothRotation.get();
    }
  });

  return (
    <Float
      speed={CONFIG.floatSpeed}
      rotationIntensity={CONFIG.floatRotation}
      floatIntensity={CONFIG.floatIntensity}>
      <Center>
        <primitive ref={modelRef} object={scene} scale={CONFIG.scale} />
      </Center>
    </Float>
  );
}

export default function ScrollScene() {
  const { scrollYProgress } = useScroll();
  const { shadow: s } = CONFIG;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, CONFIG.cameraZ], fov: CONFIG.cameraFov }}
        dpr={[1, 2]}>
        <ambientLight intensity={CONFIG.ambientIntensity} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={CONFIG.spotIntensity}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={CONFIG.pointIntensity} />

        <Suspense fallback={null}>
          <Model scrollProgress={scrollYProgress} />
          <Environment preset="city" />
          <ContactShadows
            position={[0, s.positionY, 0]}
            opacity={s.opacity}
            scale={s.scale}
            blur={s.blur}
            far={s.far}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
