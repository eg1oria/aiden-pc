'use client';

import { motion } from 'framer-motion';
import s from './Process.module.scss';

const STEPS = [
  {
    step: '01',
    title: 'Обсуждаем задачи',
    description:
      'Выясняем, для чего вам нужен ПК: игры, стриминг, монтаж, работа. Определяем бюджет и приоритеты.',
  },
  {
    step: '02',
    title: 'Подбираем конфигурацию',
    description:
      'Составляем оптимальную сборку с учётом совместимости, производительности и ваших пожеланий.',
  },
  {
    step: '03',
    title: 'Собираем и тестируем',
    description: 'Аккуратная сборка с идеальным кабель-менеджментом. 24 часа стресс-тестов.',
  },
  {
    step: '04',
    title: 'Доставляем',
    description: 'Безопасная упаковка и доставка. Подключаем, настраиваем, объясняем.',
  },
];

export default function Process() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="section-heading">Как это работает</h2>
          <p className="section-subtitle">От заявки до готового ПК — 4 простых шага</p>
        </motion.div>

        <div className={s.timeline}>
          {STEPS.map((item, i) => (
            <motion.div
              key={i}
              className={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true, margin: '-50px' }}>
              <div className={s.stepNumber}>{item.step}</div>
              <div className={s.stepContent}>
                <h3 className={s.stepTitle}>{item.title}</h3>
                <p className={s.stepDesc}>{item.description}</p>
              </div>
              {i < STEPS.length - 1 && <div className={s.connector} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
