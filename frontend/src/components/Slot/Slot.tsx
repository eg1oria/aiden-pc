import React from 'react';
import s from './Slot.module.scss';

const PCBuildSection = () => {
  return (
    <section className={s.section}>
      <div className={s.glowViolet} />
      <div className={s.glowBlue} />

      {/* Кривая линия на фоне */}
      <svg
        className={s.curveLine}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <path
          d="M -50 650 C 150 500, 300 100, 600 250 S 950 600, 1250 150"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7B5EA7" stopOpacity="0" />
            <stop offset="25%" stopColor="#c4c4c4" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#4F9CF9" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d7eaff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className={`${s.block} ${s.blockTL}`}>
        <h3 className={s.headingViolet}>Идеальный кабель-менеджмент</h3>
        <p className={s.body}>Никаких висящих проводов. Только строгая эстетика.</p>
      </div>

      <div className={`${s.block} ${s.blockTR}`}>
        <h3 className={s.headingBlue}>Кастомная «водянка»</h3>
        <p className={s.body}>Охладим даже самый горячий пыл вашего процессора.</p>
      </div>

      <div className={`${s.block} ${s.blockML}`}>
        <span className={`${s.label} ${s.labelViolet}`}>Premium детали</span>
      </div>

      <div className={`${s.block} ${s.blockML2}`}>
        <p className={s.body}>Акустические панели и беззвучные вентиляторы.</p>
      </div>

      <div className={`${s.block} ${s.blockMR}`}>
        <span className={`${s.label} ${s.labelBlue}`}>Стресс-тесты 24 часа</span>
      </div>

      <div className={`${s.block} ${s.blockMR2}`}>
        <p className={s.body}>Оптимальный баланс цены и производительности.</p>
      </div>

      <div className={`${s.block} ${s.blockBL}`}>
        <h3 className={s.headingGradient}>FPS до небес</h3>
        <p className={s.body}>Сборки на базе новейших RTX видеокарт.</p>
      </div>

      <div className={`${s.block} ${s.blockBR}`}>
        <h3 className={s.headingBlue}>Гарантия 3 года</h3>
        <p className={s.body}>Полная поддержка и бесплатное ТО.</p>
      </div>
    </section>
  );
};

export default PCBuildSection;
