'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from './FAQ.module.scss';

const FAQ_ITEMS = [
  {
    q: 'Сколько времени занимает сборка ПК?',
    a: 'Стандартная сборка занимает 24 часа с момента подтверждения заказа. В период высокого спроса — до 48 часов. Мы всегда сообщаем точные сроки.',
  },
  {
    q: 'Какая гарантия на сборку?',
    a: 'Мы даём 3 года гарантии на все комплектующие и работу по сборке. В первый год — бесплатное техническое обслуживание. Также помогаем с настройкой и апгрейдом.',
  },
  {
    q: 'Можно ли заказать сборку по своей конфигурации?',
    a: 'Конечно! Вы можете предложить свою конфигурацию, а мы проверим совместимость, оптимизируем и соберём. Если нужно — предложим альтернативы для лучшего результата.',
  },
  {
    q: 'Вы доставляете по всей России?',
    a: 'Да, доставляем по всей России через надёжные транспортные компании. ПК упакован в специальную антишоковую упаковку. Также доступен самовывоз.',
  },
  {
    q: 'Как проходит оплата?',
    a: 'Принимаем оплату картой, переводом или наличными при самовывозе. Возможна предоплата 50% + 50% при получении для дорогих сборок.',
  },
  {
    q: 'Какие комплектующие вы используете?',
    a: 'Только оригинальные комплектующие от официальных дистрибьюторов: Intel, AMD, NVIDIA, Corsair, Samsung, be quiet!, ASUS, MSI и других проверенных брендов.',
  },
  {
    q: 'Можно ли потом апгрейдить сборку?',
    a: 'Да! Мы всегда учитываем возможность будущего апгрейда. Выбираем материнские платы и корпуса с запасом. Апгрейд можно заказать у нас отдельно.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={s.section} id="faq">
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="section-heading">Частые вопросы</h2>
          <p className="section-subtitle">Не нашли ответ? Напишите нам — ответим в течение часа</p>
        </motion.div>

        <div className={s.list}>
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className={`${s.item} ${openIndex === i ? s.open : ''}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}>
              <button
                className={s.question}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}>
                <span>{item.q}</span>
                <span className={s.icon}>{openIndex === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className={s.answerWrap}>
                    <p className={s.answer}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
