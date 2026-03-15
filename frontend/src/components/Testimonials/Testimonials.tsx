'use client';

import { motion } from 'framer-motion';
import s from './Testimonials.module.scss';

const REVIEWS = [
  {
    name: 'Артём К.',
    role: 'Стример',
    text: 'Заказал сборку для стриминга — собрали за сутки. OBS летает, стрим идёт без единого фриза. Кабель-менеджмент просто космос.',
    rating: 5,
  },
  {
    name: 'Даниил М.',
    role: 'Геймер',
    text: 'Взял Gaming Pro сборку. Cyberpunk на ультрах стабильно 90+ FPS в 2K. Ребята реально знают своё дело.',
    rating: 5,
  },
  {
    name: 'Максим Л.',
    role: 'Видеограф',
    text: 'Собрали станцию для монтажа в DaVinci. 4K таймлайн крутится как масло. Рендер в 3 раза быстрее моего старого ПК.',
    rating: 5,
  },
  {
    name: 'Алексей В.',
    role: 'Разработчик',
    text: 'Нужен был тихий и мощный ПК для работы. Сделали идеально — шум вентиляторов не слышно даже ночью.',
    rating: 5,
  },
  {
    name: 'Кирилл Н.',
    role: 'Контент-мейкер',
    text: 'Третий раз обращаюсь. Собрали ПК другу по моей рекомендации. Качество сборки top-tier, ценник честный.',
    rating: 5,
  },
  {
    name: 'Егор С.',
    role: 'Киберспортсмен',
    text: 'Стабильные 400+ FPS в CS2. На турнирах ни одного фриза. Сборка не подводит уже год.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className={s.section} id="testimonials">
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="section-heading">Отзывы клиентов</h2>
          <p className="section-subtitle">Более 500 собранных ПК. Вот что говорят наши клиенты</p>
        </motion.div>

        <div className={s.grid}>
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              className={s.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true, margin: '-40px' }}>
              <div className={s.stars}>
                {Array.from({ length: review.rating }).map((_, j) => (
                  <span key={j} className={s.star}>
                    ★
                  </span>
                ))}
              </div>
              <p className={s.text}>{review.text}</p>
              <div className={s.author}>
                <div className={s.avatar}>{review.name.charAt(0)}</div>
                <div>
                  <div className={s.name}>{review.name}</div>
                  <div className={s.role}>{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
