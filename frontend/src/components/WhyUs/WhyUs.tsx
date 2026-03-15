'use client';

import { motion } from 'framer-motion';
import s from './WhyUs.module.scss';

const ADVANTAGES = [
  {
    icon: '⚡',
    title: 'Сборка за 24 часа',
    description: 'Получите готовый ПК уже на следующий день. Без задержек и ожидания.',
  },
  {
    icon: '🛡️',
    title: 'Гарантия 3 года',
    description: 'Полная гарантия на все комплектующие и работу. Бесплатное ТО в течение года.',
  },
  {
    icon: '🔧',
    title: 'Честные комплектующие',
    description: 'Только оригинальные компоненты от официальных дистрибьюторов. Никаких подделок.',
  },
  {
    icon: '📊',
    title: 'Стресс-тесты 24ч',
    description: 'Каждая сборка проходит полный цикл тестирования перед отправкой клиенту.',
  },
  {
    icon: '🎨',
    title: 'Кабель-менеджмент',
    description: 'Идеальная укладка кабелей. Ваш ПК будет выглядеть как с обложки журнала.',
  },
  {
    icon: '💬',
    title: 'Поддержка 24/7',
    description: 'Всегда на связи. Поможем с настройкой, апгрейдом и любыми вопросами.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function WhyUs() {
  return (
    <section className={s.section} id="why">
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="section-heading">Почему выбирают АЙДЕН</h2>
          <p className="section-subtitle">
            Мы не просто собираем компьютеры — мы создаём инструменты, которым можно доверять
          </p>
        </motion.div>

        <div className={s.grid}>
          {ADVANTAGES.map((item, i) => (
            <motion.div
              key={i}
              className={s.card}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}>
              <div className={s.iconWrap}>
                <span className={s.icon}>{item.icon}</span>
              </div>
              <h3 className={s.cardTitle}>{item.title}</h3>
              <p className={s.cardDesc}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
