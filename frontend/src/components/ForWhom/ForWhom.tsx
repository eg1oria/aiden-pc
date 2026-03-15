'use client';

import { motion } from 'framer-motion';
import s from './ForWhom.module.scss';

const AUDIENCES = [
  {
    icon: '🎮',
    title: 'Геймерам',
    desc: 'Максимальный FPS, плавный геймплей, RGB подсветка — всё для комфортной игры.',
    tags: ['AAA игры', 'Киберспорт', '4K Gaming'],
  },
  {
    icon: '📡',
    title: 'Стримерам',
    desc: 'Стрим + игра без просадок. Многопоточный процессор, много RAM, тихая система.',
    tags: ['OBS', 'Twitch', 'YouTube'],
  },
  {
    icon: '🎬',
    title: 'Монтажёрам',
    desc: 'Быстрый рендер, плавный таймлайн в 4K, много оперативной памяти.',
    tags: ['DaVinci', 'Premiere', 'After Effects'],
  },
  {
    icon: '💼',
    title: 'Для работы',
    desc: 'Тихий, надёжный, производительный ПК для ежедневных задач.',
    tags: ['Программирование', '3D', 'Офис'],
  },
];

export default function ForWhom() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="section-heading">Для кого наши сборки</h2>
          <p className="section-subtitle">
            Подберём конфигурацию под любые задачи — от казуальных игр до профессиональной работы
          </p>
        </motion.div>

        <div className={s.grid}>
          {AUDIENCES.map((item, i) => (
            <motion.div
              key={i}
              className={s.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, margin: '-40px' }}>
              <span className={s.icon}>{item.icon}</span>
              <h3 className={s.cardTitle}>{item.title}</h3>
              <p className={s.cardDesc}>{item.desc}</p>
              <div className={s.tags}>
                {item.tags.map((tag, j) => (
                  <span key={j} className={s.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
