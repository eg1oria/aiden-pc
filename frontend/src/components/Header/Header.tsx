import s from './Header.module.scss';

export default function Header() {
  return (
    <div className={s.header}>
      <div className="container">
        <div className={s.header_content}>
          <div className={s.header_content_logo}>
            <span className={s.header_content_logo_text}>АЙДЕН</span>
            <span className={`${s.header_content_logo_text} ${s.header_content_logo_color}`}>
              ПК
            </span>
          </div>
          <nav className={s.header_content_nav}>
            <ul className={s.header_content_nav_list}>
              <li className={s.header_content_nav_list_item}>Готовые сборки</li>
              <li className={s.header_content_nav_list_item}>Конфигуратор</li>
              <li className={s.header_content_nav_list_item}>Почему мы</li>
              <li className={s.header_content_nav_list_item}>Отзывы</li>
            </ul>
          </nav>
          <button className={s.header_content_btn}>Собрать свой ПК</button>
        </div>
      </div>
    </div>
  );
}
