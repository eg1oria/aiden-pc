'use client';

import { useState } from 'react';

export default function Split() {
  const [inputValue, setInputValue] = useState(''); // Для текста в инпуте
  const [result, setResult] = useState(''); // Для хранения массива после разделения

  const handleBtn = () => {
    const symbols = inputValue.split('@')[0];
    setResult(symbols);
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        placeholder="Введите текст..."
      />
      <button onClick={handleBtn}>Разделить</button>

      <div>
        <p>Результат:</p>
        <p>{result}</p>
      </div>
    </div>
  );
}
