'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import s from './PCBuilds.module.scss';

const BUILDS = [
  {
    id: 1,
    name: 'Start',
    price: '45 000 ₽',
    specs: ['Intel Core i3-12100F', 'GTX 1650 4GB', '16GB DDR4', '500GB NVMe'],
    color: '#6b7280',
    image: '',
  },
  {
    id: 2,
    name: 'Gaming',
    price: '85 000 ₽',
    specs: ['Intel Core i5-12400F', 'RTX 4060 8GB', '32GB DDR4', '1TB NVMe'],
    color: '#8b5cf6',
    popular: true,
    image: '/pc2.webp',
  },
  {
    id: 3,
    name: 'Pro',
    price: '145 000 ₽',
    specs: ['Intel Core i7-14700F', 'RTX 4070 Super', '64GB DDR5', '2TB NVMe'],
    color: '#3b82f6',
    image: '/pc3.png',
  },
  {
    id: 4,
    name: 'Ultra',
    price: '280 000 ₽',
    specs: ['Intel Core i9-14900K', 'RTX 4090', '128GB DDR5', '4TB NVMe'],
    color: '#10b981',
    image: '/pc2.webp',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function PCBuilds() {
  return (
    <section className={s.section} id="builds">
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className={s.title}>Готовые сборки</h2>
          <p className={s.subtitle}>Проверенные конфигурации под любые задачи</p>
        </motion.div>

        <div className={s.grid}>
          {BUILDS.map((build, i) => (
            <motion.div
              key={build.id}
              className={`${s.card} ${build.popular ? s.popular : ''}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}>
              {/* Gradient border glow for popular */}
              {build.popular && <div className={s.cardGlow} />}

              <div className={s.imageWrapper}>
                {build.image && (
                  <Image
                    src={build.image}
                    alt={build.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={s.image}
                  />
                )}
              </div>

              <div className={s.cardContent}>
                {build.popular && <span className={s.badge}>Хит</span>}
                <div className={s.cardHeader}>
                  <span className={s.cardName}>{build.name}</span>
                  <span className={s.cardPrice} style={{ color: build.color }}>
                    {build.price}
                  </span>
                </div>

                <ul className={s.specs}>
                  {build.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>

                <button
                  className={s.btn}
                  onClick={() =>
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }>
                  Выбрать
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
