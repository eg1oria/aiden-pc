'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from './Configurator.module.scss';

type Purpose = 'gaming' | 'streaming' | 'editing' | 'universal' | 'office';
type Priority = 'performance' | 'silence' | 'design' | 'value';

interface Build {
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  cooler: string;
  psu: string;
  price: number;
  fps: string;
  description: string;
}

const PURPOSES: { id: Purpose; label: string; icon: string; desc: string }[] = [
  { id: 'gaming', label: 'Игры', icon: '🎮', desc: 'Высокие FPS в AAA играх' },
  { id: 'streaming', label: 'Стриминг', icon: '📡', desc: 'Стрим + игра без просадок' },
  { id: 'editing', label: 'Монтаж', icon: '🎬', desc: 'Видео, 3D, рендеринг' },
  { id: 'universal', label: 'Универсальный', icon: '💻', desc: 'Всё понемногу' },
  { id: 'office', label: 'Офис', icon: '📋', desc: 'Документы, браузер, учёба' },
];

const PRIORITIES: { id: Priority; label: string; icon: string }[] = [
  { id: 'performance', label: 'Производительность', icon: '⚡' },
  { id: 'silence', label: 'Тишина', icon: '🔇' },
  { id: 'design', label: 'Дизайн', icon: '✨' },
  { id: 'value', label: 'Цена / Качество', icon: '💰' },
];

const BUDGET_MARKS = [30000, 50000, 80000, 120000, 180000, 250000, 350000];

function getBuild(purpose: Purpose, budget: number, priority: Priority): Build {
  // Office builds
  if (purpose === 'office' || budget <= 40000) {
    return {
      name: 'Office Starter',
      cpu: 'Intel Core i3-12100',
      gpu: 'Встроенная графика',
      ram: '16GB DDR4-3200',
      storage: '500GB NVMe SSD',
      cooler: 'Box Cooler',
      psu: '450W 80+ Bronze',
      price: Math.min(budget, 35000),
      fps: '—',
      description:
        'Надёжная сборка для работы с документами, браузером и учёбы. Тихая и энергоэффективная.',
    };
  }

  // Budget gaming
  if (budget <= 65000) {
    return {
      name: 'Start Gaming',
      cpu: 'Intel Core i5-12400F',
      gpu: 'GTX 1660 Super 6GB',
      ram: '16GB DDR4-3200',
      storage: '500GB NVMe SSD',
      cooler: priority === 'silence' ? 'be quiet! Pure Rock 2' : 'DeepCool AK400',
      psu: '550W 80+ Bronze',
      price: Math.min(budget, 55000),
      fps: '60-80 FPS в Full HD',
      description: 'Хорошая стартовая сборка для киберспортивных игр и проектов среднего уровня.',
    };
  }

  // Mid gaming / streaming
  if (budget <= 100000) {
    const isStream = purpose === 'streaming';
    return {
      name: isStream ? 'Stream Ready' : 'Gaming Core',
      cpu: isStream ? 'AMD Ryzen 7 5700X' : 'Intel Core i5-13400F',
      gpu: 'RTX 4060 8GB',
      ram: isStream ? '32GB DDR4-3600' : '16GB DDR4-3600',
      storage: '1TB NVMe SSD',
      cooler: priority === 'silence' ? 'Noctua NH-U12S' : 'DeepCool AK620',
      psu: '650W 80+ Gold',
      price: Math.min(budget, 90000),
      fps: '100-144 FPS в Full HD',
      description: isStream
        ? 'Сбалансированная сборка для одновременного стрима и игры. 8 ядер для многопоточности.'
        : 'Оптимальная сборка для комфортной игры в Full HD. Отличное соотношение цены и производительности.',
    };
  }

  // High gaming / editing
  if (budget <= 160000) {
    const isEditing = purpose === 'editing';
    return {
      name: isEditing ? 'Creator Pro' : 'Gaming Pro',
      cpu: isEditing ? 'AMD Ryzen 9 5900X' : 'Intel Core i7-14700F',
      gpu: 'RTX 4070 Super 12GB',
      ram: isEditing ? '64GB DDR4-3600' : '32GB DDR5-5600',
      storage: isEditing ? '2TB NVMe SSD' : '1TB NVMe SSD',
      cooler: priority === 'design' ? 'NZXT Kraken X63 RGB' : 'Thermalright Peerless Assassin',
      psu: '750W 80+ Gold',
      price: Math.min(budget, 145000),
      fps: isEditing ? 'DaVinci 4K timeline плавно' : '144+ FPS в QHD',
      description: isEditing
        ? 'Мощная станция для монтажа, 3D-моделирования и рендеринга. Большой объём RAM для тяжёлых проектов.'
        : 'Серьёзная игровая сборка для QHD-гейминга. RTX 4070 Super обеспечивает стабильный фреймрейт.',
    };
  }

  // Ultra builds
  if (budget <= 250000) {
    return {
      name: 'Ultra Performance',
      cpu: 'Intel Core i9-14900K',
      gpu: 'RTX 4080 Super 16GB',
      ram: '64GB DDR5-6000',
      storage: '2TB NVMe SSD',
      cooler: priority === 'silence' ? 'Noctua NH-D15S' : 'ARCTIC Liquid Freezer II 360',
      psu: '850W 80+ Gold',
      price: Math.min(budget, 230000),
      fps: '144+ FPS в 4K',
      description:
        'Топовая сборка для 4K-гейминга и профессиональной работы. Никаких компромиссов.',
    };
  }

  // Dream build
  return {
    name: 'Dream Machine',
    cpu: 'Intel Core i9-14900KS',
    gpu: 'RTX 4090 24GB',
    ram: '128GB DDR5-6400',
    storage: '4TB NVMe SSD',
    cooler: 'Custom Water Cooling Loop',
    psu: '1000W 80+ Platinum',
    price: Math.min(budget, 320000),
    fps: '200+ FPS в 4K Ultra',
    description:
      'Абсолютный максимум. Кастомное водяное охлаждение, лучшие комплектующие на рынке.',
  };
}

const STEPS = ['Цель', 'Бюджет', 'Приоритет', 'Результат'];

export default function Configurator() {
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState<Purpose>('gaming');
  const [budget, setBudget] = useState(100000);
  const [priority, setPriority] = useState<Priority>('performance');

  const build = useMemo(() => getBuild(purpose, budget, priority), [purpose, budget, priority]);

  const canProceed = step < 3;
  const canGoBack = step > 0;

  const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

  return (
    <section className={s.section} id="configurator">
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="section-heading">Конфигуратор ПК</h2>
          <p className="section-subtitle">
            Подберём идеальную сборку за 30 секунд — просто ответьте на 3 вопроса
          </p>
        </motion.div>

        {/* Progress steps */}
        <div className={s.progress}>
          {STEPS.map((label, i) => (
            <div
              key={i}
              className={`${s.progressStep} ${i <= step ? s.active : ''} ${i === step ? s.current : ''}`}>
              <div className={s.progressDot}>{i < step ? '✓' : i + 1}</div>
              <span className={s.progressLabel}>{label}</span>
              {i < STEPS.length - 1 && <div className={s.progressLine} />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className={s.stepContent}>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="purpose"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={s.stepInner}>
                <h3 className={s.stepTitle}>Для чего вам ПК?</h3>
                <div className={s.purposeGrid}>
                  {PURPOSES.map((p) => (
                    <button
                      key={p.id}
                      className={`${s.purposeCard} ${purpose === p.id ? s.selected : ''}`}
                      onClick={() => setPurpose(p.id)}>
                      <span className={s.purposeIcon}>{p.icon}</span>
                      <span className={s.purposeName}>{p.label}</span>
                      <span className={s.purposeDesc}>{p.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="budget"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={s.stepInner}>
                <h3 className={s.stepTitle}>Ваш бюджет</h3>
                <div className={s.budgetDisplay}>
                  <span className={s.budgetAmount}>{formatPrice(budget)}</span>
                </div>
                <div className={s.sliderWrap}>
                  <input
                    type="range"
                    min={30000}
                    max={350000}
                    step={5000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className={s.slider}
                  />
                  <div className={s.sliderMarks}>
                    {BUDGET_MARKS.map((mark) => (
                      <span
                        key={mark}
                        className={`${s.sliderMark} ${budget >= mark ? s.markActive : ''}`}>
                        {mark >= 1000 ? `${mark / 1000}к` : mark}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="priority"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={s.stepInner}>
                <h3 className={s.stepTitle}>Что для вас важнее всего?</h3>
                <div className={s.priorityGrid}>
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.id}
                      className={`${s.priorityCard} ${priority === p.id ? s.selected : ''}`}
                      onClick={() => setPriority(p.id)}>
                      <span className={s.priorityIcon}>{p.icon}</span>
                      <span className={s.priorityName}>{p.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className={s.stepInner}>
                <div className={s.result}>
                  <div className={s.resultHeader}>
                    <div>
                      <span className={s.resultBadge}>Рекомендуемая сборка</span>
                      <h3 className={s.resultName}>{build.name}</h3>
                      <p className={s.resultDesc}>{build.description}</p>
                    </div>
                    <div className={s.resultPrice}>
                      <span className={s.resultPriceLabel}>от</span>
                      <span className={s.resultPriceAmount}>{formatPrice(build.price)}</span>
                    </div>
                  </div>

                  <div className={s.specGrid}>
                    <div className={s.specItem}>
                      <span className={s.specLabel}>Процессор</span>
                      <span className={s.specValue}>{build.cpu}</span>
                    </div>
                    <div className={s.specItem}>
                      <span className={s.specLabel}>Видеокарта</span>
                      <span className={s.specValue}>{build.gpu}</span>
                    </div>
                    <div className={s.specItem}>
                      <span className={s.specLabel}>Оперативная память</span>
                      <span className={s.specValue}>{build.ram}</span>
                    </div>
                    <div className={s.specItem}>
                      <span className={s.specLabel}>Накопитель</span>
                      <span className={s.specValue}>{build.storage}</span>
                    </div>
                    <div className={s.specItem}>
                      <span className={s.specLabel}>Охлаждение</span>
                      <span className={s.specValue}>{build.cooler}</span>
                    </div>
                    <div className={s.specItem}>
                      <span className={s.specLabel}>Блок питания</span>
                      <span className={s.specValue}>{build.psu}</span>
                    </div>
                  </div>

                  {build.fps !== '—' && (
                    <div className={s.fpsBar}>
                      <span className={s.fpsIcon}>🎯</span>
                      <span className={s.fpsText}>{build.fps}</span>
                    </div>
                  )}

                  <div className={s.resultActions}>
                    <a
                      href="#contact"
                      className={s.resultBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}>
                      Заказать эту сборку
                    </a>
                    <button className={s.resultBtnGhost} onClick={() => setStep(0)}>
                      Начать заново
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        {step < 3 && (
          <div className={s.nav}>
            <button
              className={s.navBtnBack}
              onClick={() => setStep(step - 1)}
              disabled={!canGoBack}>
              Назад
            </button>
            <button className={s.navBtnNext} onClick={() => canProceed && setStep(step + 1)}>
              {step === 2 ? 'Показать сборку' : 'Далее'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
