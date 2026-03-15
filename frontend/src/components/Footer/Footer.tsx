import s from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.grid}>
          <div className={s.brand}>
            <div className={s.logo}>
              <span className={s.logoText}>АЙДЕН</span>
              <span className={s.logoAccent}>ПК</span>
            </div>
            <p className={s.brandDesc}>
              Кастомные сборки компьютеров под ваши задачи. Качество, которому доверяют.
            </p>
          </div>

          <div className={s.col}>
            <h4 className={s.colTitle}>Навигация</h4>
            <ul className={s.links}>
              <li>
                <a href="#builds">Готовые сборки</a>
              </li>
              <li>
                <a href="#configurator">Конфигуратор</a>
              </li>
              <li>
                <a href="#why">Преимущества</a>
              </li>
              <li>
                <a href="#testimonials">Отзывы</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>

          <div className={s.col}>
            <h4 className={s.colTitle}>Контакты</h4>
            <ul className={s.links}>
              <li>
                <span className={s.dim}>Telegram:</span> @aiden_pc
              </li>
              <li>
                <span className={s.dim}>Email:</span> hello@aidenpc.ru
              </li>
              <li>
                <span className={s.dim}>YouTube:</span> АЙДЕН
              </li>
            </ul>
          </div>
        </div>

        <div className={s.bottom}>
          <span className={s.copy}>© {new Date().getFullYear()} АЙДЕН ПК. Все права защищены.</span>
        </div>
      </div>
    </footer>
  );
}
