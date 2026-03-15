'use client';

import React from 'react';
import { motion } from 'framer-motion';
import s from './Slot.module.scss';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  },
  viewport: { once: true, margin: '-50px' as const },
});

const PCBuildSection = () => {
  return (
    <section className={s.section}>
      <div className={s.glowViolet} />
      <div className={s.glowBlue} />

      <svg
        className={s.curveLine}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <path
          d="M -50 650 C 150 500, 300 100, 600 250 S 950 600, 1250 150"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7B5EA7" stopOpacity="0" />
            <stop offset="25%" stopColor="#c4c4c4" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#4F9CF9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d7eaff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div className={`${s.block} ${s.blockTL}`} {...fadeUp(0)}>
        <h3 className={s.headingViolet}>Идеальный кабель-менеджмент</h3>
        <p className={s.body}>Никаких висящих проводов. Только строгая эстетика.</p>
      </motion.div>

      <motion.div className={`${s.block} ${s.blockTR}`} {...fadeUp(0.1)}>
        <h3 className={s.headingBlue}>Кастомная «водянка»</h3>
        <p className={s.body}>Охладим даже самый горячий пыл вашего процессора.</p>
      </motion.div>

      <motion.div className={`${s.block} ${s.blockML}`} {...fadeUp(0.2)}>
        <span className={`${s.label} ${s.labelViolet}`}>Premium детали</span>
      </motion.div>

      <motion.div className={`${s.block} ${s.blockML2}`} {...fadeUp(0.25)}>
        <p className={s.body}>Акустические панели и беззвучные вентиляторы.</p>
      </motion.div>

      <motion.div className={`${s.block} ${s.blockMR}`} {...fadeUp(0.2)}>
        <span className={`${s.label} ${s.labelBlue}`}>Стресс-тесты 24 часа</span>
      </motion.div>

      <motion.div className={`${s.block} ${s.blockMR2}`} {...fadeUp(0.25)}>
        <p className={s.body}>Оптимальный баланс цены и производительности.</p>
      </motion.div>

      <motion.div className={`${s.block} ${s.blockBL}`} {...fadeUp(0.3)}>
        <h3 className={s.headingGradient}>FPS до небес</h3>
        <p className={s.body}>Сборки на базе новейших RTX видеокарт.</p>
      </motion.div>

      <motion.div className={`${s.block} ${s.blockBR}`} {...fadeUp(0.35)}>
        <h3 className={s.headingBlue}>Гарантия 3 года</h3>
        <p className={s.body}>Полная поддержка и бесплатное ТО.</p>
      </motion.div>
    </section>
  );
};

export default PCBuildSection;
