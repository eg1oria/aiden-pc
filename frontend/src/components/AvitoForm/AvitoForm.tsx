'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import s from './AvitoForm.module.scss';

const TEMPLATES = [
  {
    id: 'polite',
    label: 'Вежливый запрос',
    icon: '👋',
    text: 'Добрый день! Интересует ваше объявление. Подскажите, пожалуйста, актуально ли оно? Буду рад обсудить детали.',
  },
  {
    id: 'availability',
    label: 'Наличие',
    icon: '📦',
    text: 'Здравствуйте! Подскажите, товар ещё в наличии? Готов к покупке, если да.',
  },
  {
    id: 'bargain',
    label: 'Торг',
    icon: '💰',
    text: 'Добрый день! Очень заинтересовало ваше предложение. Подскажите, возможен ли небольшой торг? Готов забрать в ближайшее время.',
  },
  {
    id: 'condition',
    label: 'Состояние',
    icon: '🔍',
    text: 'Здравствуйте! Можете подробнее рассказать о состоянии товара? Есть ли какие-то дефекты или нюансы? Буду благодарен за честный ответ.',
  },
  {
    id: 'delivery',
    label: 'Доставка',
    icon: '🚚',
    text: 'Добрый день! Подскажите, возможна ли доставка? Если да — какие варианты и стоимость? Также рассматриваю самовывоз.',
  },
];

const QUICK_PHRASES = [
  'Когда можно забрать?',
  'Есть ли чек/гарантия?',
  'Можно ещё фото?',
  'Готов забрать сегодня',
  'Работает ли всё исправно?',
  'Почему продаёте?',
];

const AVITO_URL_REGEX = /^https?:\/\/(www\.)?avito\.ru\/.+/i;

interface FormData {
  name: string;
  contact: string;
  url: string;
  subject: string;
  message: string;
}

type CopyState = 'idle' | 'success' | 'error';

export default function AvitoForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    contact: '',
    url: '',
    subject: '',
    message: '',
  });
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const [urlError, setUrlError] = useState('');
  const [msgError, setMsgError] = useState('');
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'url') setUrlError('');
    if (field === 'message') setMsgError('');
  }, []);

  const validateUrl = useCallback((): boolean => {
    if (!form.url.trim()) {
      setUrlError('Вставьте ссылку на объявление Avito');
      return false;
    }
    if (!AVITO_URL_REGEX.test(form.url.trim())) {
      setUrlError('Ссылка должна начинаться с avito.ru');
      return false;
    }
    setUrlError('');
    return true;
  }, [form.url]);

  const handleCopy = useCallback(async () => {
    if (!form.message.trim()) {
      setMsgError('Напишите сообщение или выберите шаблон');
      return;
    }
    setMsgError('');
    try {
      await navigator.clipboard.writeText(form.message);
      setCopyState('success');
      setTimeout(() => setCopyState('idle'), 2500);
    } catch {
      setCopyState('error');
      setTimeout(() => setCopyState('idle'), 2500);
    }
  }, [form.message]);

  const handleOpenAvito = useCallback(() => {
    if (!validateUrl()) return;
    window.open(form.url.trim(), '_blank', 'noopener,noreferrer');
  }, [form.url, validateUrl]);

  const handleSelectTemplate = useCallback((template: (typeof TEMPLATES)[0]) => {
    setActiveTemplate(template.id);
    setForm((prev) => ({ ...prev, message: template.text }));
    setMsgError('');
  }, []);

  const handleQuickPhrase = useCallback((phrase: string) => {
    setForm((prev) => ({
      ...prev,
      message: prev.message ? `${prev.message} ${phrase}` : phrase,
    }));
    setMsgError('');
  }, []);

  const handleClear = useCallback(() => {
    setForm({ name: '', contact: '', url: '', subject: '', message: '' });
    setActiveTemplate(null);
    setUrlError('');
    setMsgError('');
    setCopyState('idle');
  }, []);

  const charCount = form.message.length;

  return (
    <section className={s.section} id="avito">
      <div className={s.glow} />
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <h2 className="section-heading">Написать на Avito</h2>
          <p className="section-subtitle">
            Подготовьте сообщение — скопируйте — откройте объявление — отправьте вручную
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div
          className={s.howItWorks}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}>
          <div className={s.howStep}>
            <span className={s.howNum}>1</span>
            <span className={s.howText}>Вставьте ссылку на объявление</span>
          </div>
          <div className={s.howDivider} />
          <div className={s.howStep}>
            <span className={s.howNum}>2</span>
            <span className={s.howText}>Напишите или выберите шаблон</span>
          </div>
          <div className={s.howDivider} />
          <div className={s.howStep}>
            <span className={s.howNum}>3</span>
            <span className={s.howText}>Скопируйте и откройте Avito</span>
          </div>
          <div className={s.howDivider} />
          <div className={s.howStep}>
            <span className={s.howNum}>4</span>
            <span className={s.howText}>Вставьте и отправьте сами</span>
          </div>
        </motion.div>

        <motion.div
          className={s.formCard}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}>
          <div className={s.formGrid}>
            {/* Left column: form fields */}
            <div className={s.formFields}>
              <div className={s.fieldRow}>
                <div className={s.field}>
                  <label className={s.label} htmlFor="avito-name">
                    Ваше имя
                  </label>
                  <input
                    id="avito-name"
                    type="text"
                    className={s.input}
                    placeholder="Как к вам обращаться"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    maxLength={100}
                  />
                </div>
                <div className={s.field}>
                  <label className={s.label} htmlFor="avito-contact">
                    Контакт <span className={s.optional}>(необязательно)</span>
                  </label>
                  <input
                    id="avito-contact"
                    type="text"
                    className={s.input}
                    placeholder="Telegram / телефон"
                    value={form.contact}
                    onChange={(e) => updateField('contact', e.target.value)}
                    maxLength={100}
                  />
                </div>
              </div>

              <div className={s.field}>
                <label className={s.label} htmlFor="avito-url">
                  Ссылка на объявление Avito
                </label>
                <input
                  id="avito-url"
                  type="url"
                  className={`${s.input} ${urlError ? s.inputError : ''}`}
                  placeholder="https://www.avito.ru/..."
                  value={form.url}
                  onChange={(e) => updateField('url', e.target.value)}
                  maxLength={500}
                />
                {urlError && <span className={s.errorText}>{urlError}</span>}
              </div>

              <div className={s.field}>
                <label className={s.label} htmlFor="avito-subject">
                  Тема обращения <span className={s.optional}>(необязательно)</span>
                </label>
                <input
                  id="avito-subject"
                  type="text"
                  className={s.input}
                  placeholder="Например: Вопрос по сборке ПК"
                  value={form.subject}
                  onChange={(e) => updateField('subject', e.target.value)}
                  maxLength={200}
                />
              </div>

              <div className={s.field}>
                <label className={s.label} htmlFor="avito-message">
                  Сообщение продавцу
                </label>
                <textarea
                  id="avito-message"
                  className={`${s.textarea} ${msgError ? s.inputError : ''}`}
                  placeholder="Напишите сообщение или выберите шаблон справа..."
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  rows={6}
                  maxLength={2000}
                />
                <div className={s.textareaFooter}>
                  {msgError && <span className={s.errorText}>{msgError}</span>}
                  <span className={s.charCount}>{charCount} / 2000</span>
                </div>
              </div>

              {/* Quick phrases */}
              <div className={s.quickPhrases}>
                <span className={s.quickLabel}>Быстрые фразы:</span>
                <div className={s.chips}>
                  {QUICK_PHRASES.map((phrase) => (
                    <button
                      key={phrase}
                      className={s.chip}
                      type="button"
                      onClick={() => handleQuickPhrase(phrase)}>
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: templates */}
            <div className={s.templatesCol}>
              <h4 className={s.templatesTitle}>Шаблоны сообщений</h4>
              <div className={s.templates}>
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    className={`${s.templateBtn} ${activeTemplate === t.id ? s.templateActive : ''}`}
                    type="button"
                    onClick={() => handleSelectTemplate(t)}>
                    <span className={s.templateIcon}>{t.icon}</span>
                    <span className={s.templateLabel}>{t.label}</span>
                  </button>
                ))}
              </div>
              <p className={s.templatesHint}>
                Выберите шаблон — он подставится в поле сообщения. Можно отредактировать под себя.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className={s.actions}>
            <button
              type="button"
              className={`${s.btnCopy} ${copyState === 'success' ? s.btnSuccess : ''} ${copyState === 'error' ? s.btnError : ''}`}
              onClick={handleCopy}>
              {copyState === 'success'
                ? '✓ Скопировано!'
                : copyState === 'error'
                  ? 'Ошибка копирования'
                  : 'Скопировать сообщение'}
            </button>
            <button type="button" className={s.btnAvito} onClick={handleOpenAvito}>
              Открыть объявление Avito ↗
            </button>
            <button type="button" className={s.btnClear} onClick={handleClear}>
              Очистить
            </button>
          </div>

          {/* Disclaimer */}
          <p className={s.disclaimer}>
            Сообщение отправляется вручную на стороне Avito. Мы не отправляем сообщения
            автоматически.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
