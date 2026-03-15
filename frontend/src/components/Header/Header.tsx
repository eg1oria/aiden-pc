'use client';

import { useState, useEffect, useCallback } from 'react';
import s from './Header.module.scss';

const NAV_ITEMS = [
  { label: 'Готовые сборки', href: '#builds' },
  { label: 'Конфигуратор', href: '#configurator' },
  { label: 'Почему мы', href: '#why' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Avito', href: '#avito' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
      <div className="container">
        <div className={s.header_content}>
          <a href="#" className={s.header_content_logo}>
            <span className={s.header_content_logo_text}>АЙДЕН</span>
            <span className={`${s.header_content_logo_text} ${s.header_content_logo_color}`}>
              ПК
            </span>
          </a>
          <nav className={`${s.header_content_nav} ${menuOpen ? s.navOpen : ''}`}>
            <ul className={s.header_content_nav_list}>
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className={s.header_content_nav_list_item}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#contact"
            className={s.header_content_btn}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#contact');
            }}>
            Собрать свой ПК
          </a>
          <button
            className={`${s.burger} ${menuOpen ? s.burgerOpen : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && <div className={s.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
