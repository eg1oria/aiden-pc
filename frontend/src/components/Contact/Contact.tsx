'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import s from './Contact.module.scss';

interface FormData {
  name: string;
  contact: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', contact: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', contact: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className={s.section} id="contact">
      <div className={s.glow} />
      <div className={s.container}>
        <div className={s.grid}>
          <motion.div
            className={s.info}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <h2 className={s.title}>Готовы собрать свой идеальный ПК?</h2>
            <p className={s.desc}>
              Оставьте заявку, и мы свяжемся с вами в течение часа. Подберём оптимальную
              конфигурацию под ваши задачи и бюджет.
            </p>
            <div className={s.features}>
              <div className={s.feature}>
                <span className={s.featureIcon}>💬</span>
                <div>
                  <div className={s.featureTitle}>Бесплатная консультация</div>
                  <div className={s.featureDesc}>Поможем определиться с конфигурацией</div>
                </div>
              </div>
              <div className={s.feature}>
                <span className={s.featureIcon}>⚡</span>
                <div>
                  <div className={s.featureTitle}>Ответ за 1 час</div>
                  <div className={s.featureDesc}>В рабочее время — ещё быстрее</div>
                </div>
              </div>
              <div className={s.feature}>
                <span className={s.featureIcon}>🔒</span>
                <div>
                  <div className={s.featureTitle}>Без обязательств</div>
                  <div className={s.featureDesc}>Просто обсудим ваш будущий ПК</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className={s.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}>
            <div className={s.field}>
              <label className={s.label} htmlFor="name">
                Ваше имя
              </label>
              <input
                id="name"
                type="text"
                className={s.input}
                placeholder="Как к вам обращаться?"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                maxLength={100}
              />
            </div>
            <div className={s.field}>
              <label className={s.label} htmlFor="contact">
                Telegram / Телефон
              </label>
              <input
                id="contact"
                type="text"
                className={s.input}
                placeholder="@username или +7..."
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                required
                maxLength={100}
              />
            </div>
            <div className={s.field}>
              <label className={s.label} htmlFor="message">
                Сообщение (необязательно)
              </label>
              <textarea
                id="message"
                className={s.textarea}
                placeholder="Расскажите о ваших задачах, бюджете или пожеланиях..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                maxLength={1000}
              />
            </div>

            <button type="submit" className={s.submit} disabled={status === 'loading'}>
              {status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
            </button>

            {status === 'success' && (
              <p className={s.statusSuccess}>
                Заявка отправлена! Мы свяжемся с вами в ближайшее время.
              </p>
            )}
            {status === 'error' && (
              <p className={s.statusError}>
                Произошла ошибка. Попробуйте позже или напишите нам напрямую.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
