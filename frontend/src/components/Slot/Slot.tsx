import React from 'react';
import s from './Slot.module.scss';

const PCBuildSection = () => {
  return (
    <section className={s.section}>
      <div className={s.glowViolet} />
      <div className={s.glowBlue} />

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
