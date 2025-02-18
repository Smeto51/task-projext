"use client";

//import "./form/WorkedForm.css";
import { useEffect, useState } from "react";

export default function AnnouncementAdd() {
  //const [idAnnouncement, setIdAnnouncement] = useState(0);
  const [nameAnnouncement, setNameAnnouncement] = useState("");
  const [specification, setSpecification] = useState("");
  const [price, setPrice] = useState("");

  const handleSave = () => {
    if (typeof window !== "undefined") {
      if (nameAnnouncement == "" || specification == "" || price == "") {
        alert("Какое-то поле не заполнено, не удалось сохоранить");
        event.preventDefault();
        return;
      }
      const newAnnouncement = {
        id: Date.now(),
        name: nameAnnouncement,
        specification: specification,
        price: price,
      };

      const saveAnnouncement =
        JSON.parse(localStorage.getItem("Announcement")) || [];
      saveAnnouncement.push(newAnnouncement);
      localStorage.setItem("Announcement", JSON.stringify(saveAnnouncement));
      alert("Объявление добавлено!");
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
          onChange={(nameValue) =>
            setNameAnnouncement(nameValue.target.value)
          } /*При потере курсора с элемента*/
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
          placeholder="Введите описание"
        ></textarea>

        <label htmlFor="price">Цена:</label>
        <input
          type="number"
          value={price}
          onChange={(priceValue) => setPrice(priceValue.target.value)}
          id="price"
          maxLength={12}
          placeholder="Укажите цену в рублях"
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
