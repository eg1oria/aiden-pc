'use client';

import Image from 'next/image';
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

export default function PCBuilds() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={s.title}>Готовые сборки</h2>
        <p className={s.subtitle}>Проверенные конфигурации под любые задачи</p>

        <div className={s.grid}>
          {BUILDS.map((build) => (
            <div key={build.id} className={`${s.card} ${build.popular ? s.popular : ''}`}>
              <div className={s.imageWrapper}>
                {build.image && (
                  <div className={s.imageWrapper}>
                    <Image
                      src={build.image}
                      alt={build.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className={s.image}
                    />
                  </div>
                )}
              </div>

              <div className={s.cardContent}>
                {build.popular && <span className={s.badge}>Хит</span>}
                <div className={s.cardHeader}>
                  <span className={s.cardName}>{build.name}</span>
                  <span className={s.cardPrice}>{build.price}</span>
                </div>

                <ul className={s.specs}>
                  {build.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>

                <button className={s.btn}>Выбрать</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
