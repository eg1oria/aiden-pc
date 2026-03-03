'use client';

import { useState, useEffect } from 'react';
import s from './Intro.module.scss';

const SLOGANS = [
  'Мощь в каждой детали',
  'Идеальный кабель-менеджмент',
  'FPS на максимум',
  'Гарантия на все компоненты',
  'Сборка за 24 часа',
];

export default function Intro() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Начинаем исчезновение

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % SLOGANS.length);
        setFade(true); // Показываем новый текст
      }, 500); // Пауза на смену текста (должна совпадать с CSS transition)
    }, 4000); // Интервал 3 секунды

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={s.intro}>
      <div className="container">
        <div className={s.intro_content}>
          <div className={s.intro_left}>
            {/* Динамический слоган */}
            <div className={`${s.intro_badge} ${fade ? s.fadeIn : s.fadeOut}`}>
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
            <button className={s.intro_left_btn}>Заказать проект</button>
          </div>

          <div className={s.intro_right}>
            <div className={s.intro_right_visual} />
          </div>
        </div>
      </div>
    </section>
  );
}
