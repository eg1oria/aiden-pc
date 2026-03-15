'use client';

import React, { useRef, Suspense, useMemo, RefObject, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center, useProgress } from '@react-three/drei';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import * as THREE from 'three';

const CONFIG = {
  offsetX: 1,
  offsetY: -3,
  cameraZ: 8,
  cameraFov: 35,
  wobble: 0,
  spring: {
    stiffness: 250,
    damping: 35,
    mass: 0.5, // уменьшение массы сделает анимацию еще более "отзывчивой"
  },
  scroll: {
    yTimes: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1.0],
    yKeyframes: [3, 2, 2, 2.5, 5, 5, 2, 3.5, 5, 7],
    xTimes: [0, 0.1, 0.2, 0.3, 0.45, 0.55, 0.6, 0.7, 0.85, 1.0],
    xKeyframes: [1.5, 1, -1, -1, -1, -1.5, -2.5, -2.5, -2.5, -2.5],
    rotTimes: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.9, 1.0],
    rotKeyframes: [
      0,
      Math.PI / 2,
      Math.PI * 2.1,
      Math.PI * 2.1,
      Math.PI * 2.1,
      Math.PI * 2.1,
      Math.PI * 4.1,
      Math.PI * 4.1,
      Math.PI * 4.1,
      Math.PI * 4.1,
    ],
    scaleTimes: [0, 0.2, 0.5, 0.75, 0.8, 1.0],
    scaleKeyframes: [0.1, 0.1, 0.1, 0.07, 0.07, 0.07],
  },
  ambientIntensity: 2.5,
  spotIntensity: 12,
  pointIntensity: 60,
  shadow: { positionY: -3.5, opacity: 0.12, scale: 15, blur: 50, far: 4 },
};

useGLTF.preload('/lain_li_pc_case-v2.glb');

function Model({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const { scene } = useGLTF('/lain_li_pc_case-v2.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  const yPos = useTransform(scrollProgress, CONFIG.scroll.yTimes, CONFIG.scroll.yKeyframes);
  const xPos = useTransform(scrollProgress, CONFIG.scroll.xTimes, CONFIG.scroll.xKeyframes);
  const rotation = useTransform(scrollProgress, CONFIG.scroll.rotTimes, CONFIG.scroll.rotKeyframes);
  const scale = useTransform(
    scrollProgress,
    CONFIG.scroll.scaleTimes,
    CONFIG.scroll.scaleKeyframes,
  );

  const smoothY = useSpring(yPos, CONFIG.spring);
  const smoothX = useSpring(xPos, CONFIG.spring);
  const smoothRotation = useSpring(rotation, CONFIG.spring);
  const smoothScale = useSpring(scale, CONFIG.spring);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.y = smoothY.get() + CONFIG.offsetY;
    groupRef.current.position.x = smoothX.get() + CONFIG.offsetX;
    groupRef.current.rotation.y = smoothRotation.get();
    const s = smoothScale.get();
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
}

function Loader() {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setIsVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#060611',
        zIndex: 1000,
        transition: 'opacity 0.6s ease-out',
        opacity: progress === 100 ? 0 : 1,
      }}>
      <div style={{ textAlign: 'center' }}>
        {/* Gradient spinner */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '2px solid rgba(139, 92, 246, 0.1)',
            borderTopColor: '#8b5cf6',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 20px',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.15)',
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        {/* Progress bar */}
        <div
          style={{
            width: 120,
            height: 2,
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: 1,
            overflow: 'hidden',
            margin: '0 auto 12px',
          }}>
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #8b5cf6, #d946ef)',
              borderRadius: 1,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.3)',
            fontSize: 12,
            fontFamily: 'system-ui',
            letterSpacing: '0.05em',
            margin: 0,
          }}>
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}

interface ScrollSceneProps {
  containerRef: RefObject<HTMLElement | null>;
}

export default function ScrollScene({ containerRef }: ScrollSceneProps) {
  // useScroll теперь привязан к контейнеру.
  // 'start start' — когда верх секции касается верха экрана
  // 'end end' — когда низ секции касается низа экрана
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      style={{
        position: 'absolute', // Чтобы занять всю высоту ScrollSection
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}>
      <div
        style={{
          position: 'sticky', // Самое важное: Canvas прилипает к экрану внутри родителя
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}>
        <Loader />
        <Canvas
          shadows
          gl={{ alpha: true }}
          camera={{ position: [0, 0, CONFIG.cameraZ], fov: CONFIG.cameraFov }}
          dpr={[1, 1.5]}
          style={{ pointerEvents: 'none' }}>
          <ambientLight intensity={CONFIG.ambientIntensity} />
          <spotLight position={[5, 10, 8]} intensity={CONFIG.spotIntensity} castShadow />
          <pointLight position={[-5, 3, 5]} intensity={CONFIG.pointIntensity} />

          <Suspense fallback={null}>
            <Model scrollProgress={scrollYProgress} />
            <Environment preset="sunset" />
            <ContactShadows
              position={[0, CONFIG.shadow.positionY, 0]}
              opacity={CONFIG.shadow.opacity}
              scale={CONFIG.shadow.scale}
              blur={CONFIG.shadow.blur}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
