'use client';

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center, Float } from '@react-three/drei';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
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
    yKeyframes: [3, 3, 3, 3, 3, 3, 2, 2, 2, 3],

    xTimes: [0, 0.1, 0.2, 0.3, 0.45, 0.55, 0.6, 0.7, 0.85, 1.0],
    xKeyframes: [1.5, 1, 0, -1, -1, -1, 0, 1.5, 1.5, 1.5],

    rotTimes: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9, 1.0],
    rotKeyframes: [
      0,
      Math.PI / 4,
      Math.PI / 2,
      Math.PI * 1.5,
      Math.PI * 2,
      Math.PI * 2,
      Math.PI * 2,
      Math.PI * 3,
      Math.PI * 3.5,
      Math.PI * 4,
    ],
  },

  wobble: 0,
  spring: { stiffness: 80, damping: 20 },

  ambientIntensity: 5,
  spotIntensity: 50,
  pointIntensity: 400,

  shadow: {
    positionY: -3.5,
    opacity: 0.4,
    scale: 15,
    blur: 2.5,
    far: 4,
  },
};

// Preload модели сразу
useGLTF.preload('/lain_li_pc_case.glb');

function Model({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { scene } = useGLTF('/lain_li_pc_case.glb');

  // Клонируем сцену чтобы избежать мутации оригинала
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const groupRef = useRef<THREE.Group>(null);

  const { scroll, offsetX, offsetY, wobble, spring: sp } = CONFIG;

  const yPos = useTransform(scrollProgress, scroll.yTimes, scroll.yKeyframes);
  const xPos = useTransform(scrollProgress, scroll.xTimes, scroll.xKeyframes);
  const rotation = useTransform(scrollProgress, scroll.rotTimes, scroll.rotKeyframes);

  const smoothY = useSpring(yPos, sp);
  const smoothX = useSpring(xPos, sp);
  const smoothRotation = useSpring(rotation, sp);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.position.y =
      smoothY.get() + offsetY + Math.sin(state.clock.elapsedTime) * wobble;
    groupRef.current.position.x = smoothX.get() + offsetX;
    groupRef.current.rotation.y = smoothRotation.get();
  });

  // Убираем Float — он конфликтует с useFrame по position/rotation
  // Вместо этого оборачиваем в group и двигаем её
  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={CONFIG.scale} />
      </Center>
    </group>
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
        // Ограничиваем dpr на мобилах
        dpr={[1, 1.5]}>
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
