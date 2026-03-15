'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import s from './Intro.module.scss';

const SLOGANS = [
  'Мощь в каждой детали',
  'Идеальный кабель-менеджмент',
  'FPS на максимум',
  'Гарантия на все компоненты',
  'Сборка за 24 часа',
];

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  left: `${seededRandom(i * 7) * 100}%`,
  top: `${seededRandom(i * 13 + 3) * 100}%`,
  animationDelay: `${seededRandom(i * 17 + 5) * 8}s`,
  animationDuration: `${6 + seededRandom(i * 23 + 7) * 8}s`,
  size: `${2 + seededRandom(i * 31 + 11) * 3}px`,
}));

export default function Intro() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % SLOGANS.length);
        setFade(true);
      }, 500);
      return () => clearTimeout(timeout);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={s.intro}>
      {/* Floating particles */}
      <div className={s.particles}>
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className={s.particle}
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.animationDelay,
              animationDuration: p.animationDuration,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="container">
        <div className={s.intro_content}>
          <motion.div
            className={s.intro_left}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
            }}
            viewport={{ once: true, margin: '-100px' }}>
            {/* Динамический слоган */}
            <div className={`${s.intro_badge} ${fade ? s.fadeIn : s.fadeOut}`}>
              <span className={s.intro_badge_dot} />
              {SLOGANS[index]}
            </div>

            <h1 className={s.intro_left_title}>
              КАСТОМНЫЕ СБОРКИ <br />
              <span>КОМПЬЮТЕРОВ</span>
            </h1>
            <p className={s.intro_left_description}>
              Подбираем конфигурацию под ваши задачи и бюджет. Честные комплектующие. Реальные
              показатели FPS.
            </p>

            <div className={s.intro_left_actions}>
              <button
                className={s.intro_left_btn}
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }>
                Заказать проект
              </button>
              <button
                className={s.intro_left_btnGhost}
                onClick={() =>
                  document.getElementById('builds')?.scrollIntoView({ behavior: 'smooth' })
                }>
                Смотреть сборки
              </button>
            </div>

            {/* Stats */}
            <div className={s.intro_stats}>
              <div className={s.intro_stats_item}>
                <span className={s.intro_stats_number}>500+</span>
                <span className={s.intro_stats_label}>Собранных ПК</span>
              </div>
              <div className={s.intro_stats_divider} />
              <div className={s.intro_stats_item}>
                <span className={s.intro_stats_number}>3 года</span>
                <span className={s.intro_stats_label}>Гарантия</span>
              </div>
              <div className={s.intro_stats_divider} />
              <div className={s.intro_stats_item}>
                <span className={s.intro_stats_number}>24ч</span>
                <span className={s.intro_stats_label}>Сборка</span>
              </div>
            </div>
          </motion.div>

          <div className={s.intro_right}>
            <div className={s.intro_right_visual} />
          </div>
        </div>
      </div>
    </section>
  );
}
