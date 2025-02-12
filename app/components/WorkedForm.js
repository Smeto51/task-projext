"use client";

//import "./form/WorkedForm.css";
import { useEffect, useState } from "react";

export default function WorkedForm() {
  return (
    <form className="Announcement">
      <div>
        <h1>Добавление объявления</h1>
        <br />
        <label htmlFor="nameAnnouncement">Название:</label>
        <input type="text" id="nameAnnouncement" />

        <label>Описание:</label>
        <textarea rows="10"></textarea>

        <label htmlFor="price">Цена:</label>
        <input type="text" id="price" />
      </div>
    </form>
  );
}
/*
* Задание 1: Доска объявлений (CRUD приложение)
* Создай небольшое приложение «Доска объявлений», где можно создавать, редактировать, удалять и просматривать объявления.

* Функционал:
* 1. Форма для добавления объявления (заголовок, описание, цена).
* 2. Список объявлений с возможностью их редактирования и удаления.
* 3. Фильтрация объявлений по цене (от - до).
* 4. Сохранение данных в localStorage для имитации базы данных.

* Требования:
* 1. Использовать useState и useEffect для работы с состоянием и localStorage.
* 2. Работа с формами (контролируемые компоненты).
* 3. Реализация редактирования через модальное окно или inline-редактирование.
* 4. Фильтрация списка объявлений.
*/
/*// Обработчик изменения значений полей формы
  // Состояние для каждого поля формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Здесь можно добавить логику для отправки данных на сервер
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );*/
