"use client";

import { useEffect, useState } from "react";

export default function Announcement() {
  const [nameAnnouncement, setNameAnnouncement] = useState("");
  const [specification, setSpecification] = useState("");
  const [price, setPrice] = useState("");

  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("saveNameAnnouncement");
      const savedSpecification = localStorage.getItem("saveSpecification");
      const savedPrice = localStorage.getItem("savePrice");

      if (savedName) setNameAnnouncement(savedName);
      if (savedSpecification) setSpecification(savedSpecification);
      if (savedPrice) setPrice(savedPrice);
    }
  }, []);

  const handleSave = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("saveNameAnnouncement", nameAnnouncement);
      localStorage.setItem("saveSpecification", specification);
      localStorage.setItem("savePrice", price);
      alert("Объявление добавлено!");

      console.log(localStorage.getItem("saveNameAnnouncement"));
    }
  };

  return (
    <form className="Announcement">
      <div className="AnnouncementForm">
        <h1>Добавление объявления</h1>

        <label htmlFor="nameAnnouncement">Название:</label>
        <input
          type="text"
          value={nameAnnouncement}
          onChange={(nameValue) => setNameAnnouncement(nameValue.target.value)}
          id="nameAnnouncement"
          maxLength={57}
          placeholder="Введите название"
        />

        <label>Описание:</label>
        <textarea
          rows="10"
          className="specification"
          value={specification}
          onChange={(specificationValue) =>
            setSpecification(specificationValue.target.value)
          }
        ></textarea>

        <label htmlFor="price">Цена:</label>
        <input
          type="number"
          value={price}
          onChange={(priceValue) => setPrice(priceValue.target.value)}
          id="price"
          maxLength={12}
        />

        <div className="button-container">
          <button className="buttonWorkedForm" onClick={handleSave}>
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
}