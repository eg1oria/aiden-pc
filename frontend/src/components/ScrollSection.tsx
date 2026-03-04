'use client';

import React, { useRef } from 'react';
import Intro from './Intro/Intro';
import PCBuilds from './PCBuilds/PCBuilds';
import ScrollScene from './ScrollCube';
import PCBuildSection from './Slot/Slot';

export default function ScrollSection() {
  // Реф, который отслеживает границы всей секции
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        // Высота секции будет зависеть от контента внутри (Intro, PCBuilds и т.д.)
        minHeight: '100vh',
      }}>
      {/* 1. 3D Сцена (будет фоном внутри этой секции) */}
      <ScrollScene containerRef={sectionRef} />

      {/* 2. Контент (поверх сцены) */}
      <div style={{ position: 'relative' }}>
        <Intro />
        <PCBuildSection />
        <PCBuilds />
      </div>
    </section>
  );
}
