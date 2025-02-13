"use client"; // Указывает, что компонент выполняется на стороне клиента
import { useState, useEffect } from 'react';


export default function Home() {
  const [inputValue, setInputValue] = useState('');


  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    const savedValue = localStorage.getItem('savedInput');
    if (savedValue) {
      setInputValue(savedValue);
    }
  }, []);

  const handleSave = () => {
    // Сохранение значения в localStorage
    localStorage.setItem('savedInput', inputValue);
    alert('Данные сохранены в localStorage!');
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите текст"
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}