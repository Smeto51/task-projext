"use client";

import React, { useState } from "react";

export const InputNameAnnouncement = ({name}) => {
  console.log(`re-render InputNameAnnouncement`);
  let [nameAnnouncement, setNameAnnouncement] = useState(name || "") ;
  return (
    <> 
      <input
        type="text"
        value={nameAnnouncement}
        onChange={(nameValue) => setNameAnnouncement(nameValue.target.value)}
        id="nameAnnouncement"
        maxLength={57}
        placeholder="Введите название"
      />
    </>
  );
};

export const TextareaSpecification = ({id, spec}) => {
  console.log ('re-render Textarea Specification');
  const [specification, setSpecification] = useState(spec || "");
  return (
    <>
    
        <textarea
          rows="10"
          className="specification"
          value={specification}
          onChange={(specificationValue) =>
            setSpecification(specificationValue.target.value)
          }
          id={id}
          placeholder="Введите описание"
        ></textarea>
    </>
  )
}


export const InputPrice = ({price}) => {
  console.log(`re-render InputPrice`);
  const [priceValue, setPrice] = useState(price || "")
  return (
    <>
      <input
        type="number"
        value={priceValue}
        onChange={(priceValue) => setPrice(priceValue.target.value)}
        id="price"
        maxLength={12}
        placeholder="Укажите цену в рублях"
      />
    </>
  );
};

export default function AnnouncementAdd() {
  console.log("re-render AnnouncementAdd");
  const handleSave = () => {
    const nameAnnouncement = document.getElementById("nameAnnouncement").value;
    const specification = document.getElementById("specification").value;
    const price = document.getElementById("price").value;
    console.log("re-render handleSave");
    if (typeof window !== "undefined") {
      if (nameAnnouncement == "" || specification == "" || price == "") {
        alert("Какое-то поле не заполнено, не удалось сохранить");
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
        <InputNameAnnouncement/>
        <label>Описание:</label>
        <TextareaSpecification
          id="specification"
        />
        <label htmlFor="price">Цена:</label>
        <InputPrice/>
        <div className="button-container">
          <button className="buttonWorkedForm" onClick={handleSave}>
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
}
