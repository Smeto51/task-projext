"use client";

import React, { useRef, useState } from "react";

export const InputNameAnnouncement = ({ name, nameInputRef }) => {
  console.log(`re-render InputNameAnnouncement`);
  return (
    <>
      <input
        type="text"
        defaultValue={name}
        ref={nameInputRef} 
        id="nameAnnouncement"
        maxLength={57}
        placeholder="Введите название"
      />
    </>
  );
};

export const TextareaSpecification = ({
  id,
  spec,
  specificationTextareaRef,
}) => {
  console.log("re-render Textarea Specification");
  return (
    <>
      <textarea
        rows="10"
        className="specification"
        defaultValue={spec}
        ref={specificationTextareaRef}
        id={id}
        placeholder="Введите описание"
      ></textarea>
    </>
  );
};

export const InputPrice = ({ price, priceInputRef }) => {
  console.log(`re-render InputPrice`);

  return (
    <>
      <input
        type="number"
        defaultValue={price}
        ref={priceInputRef}
        id="price"
        maxLength={12}
        placeholder="Укажите цену в рублях"
      />
    </>
  );
};

export default function AnnouncementAdd() {

  const nameInputRef = useRef(null);
  const specificationTextareaRef = useRef(null);
  const priceInputRef = useRef(null);

  const handleSave = () => {
    /**
     * let nameAnnouncement = document.getElementById("nameAnnouncement").value;
     * let specification = document.getElementById("specification").value;
     * let price = document.getElementById("price").value;
     */

    let nameAnnouncement = nameInputRef.current.value;
    let specification = specificationTextareaRef.current.value;
    let price = priceInputRef.current.value;
    console.log("re-render handleSave");
    if (typeof window !== "undefined") {
      if (nameAnnouncement == "" || specification == "" || price == "") {
        alert("Какое-то поле не заполнено, не удалось сохранить");
        //event.preventDefault();
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

      nameInputRef.current.value = "";
      specificationTextareaRef.current.value = "";
      priceInputRef.current.value = "";

      /**
       * document.getElementById("nameAnnouncement").value = "";
       * document.getElementById("specification").value= "";
       * document.getElementById("price").value= "";
       */
    }
  };
  return (
    <div className="Announcement">
      <div className="AnnouncementForm">
        <h1>Добавление объявления</h1>
        <label htmlFor="nameAnnouncement">Название:</label>
        <InputNameAnnouncement nameInputRef={nameInputRef} />
        <label>Описание:</label>
        <TextareaSpecification
          id="specification"
          specificationTextareaRef={specificationTextareaRef}
        />
        <label htmlFor="price">Цена:</label>
        <InputPrice priceInputRef={priceInputRef} />
        <div className="button-container">
          <button
            type="button"
            className="buttonWorkedForm"
            onClick={handleSave}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
