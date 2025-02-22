"use client";
import React,{ useMemo, useState } from "react";
import "./ModalWindow.css";
import {
  InputNameAnnouncement,
  InputPrice,
  TextareaSpecification,
} from "../components/AnnouncementForm";

export default function ModalWindow({ setModalWindow, editingBb, setBb, bb }) {
  console.log("re-render ModalWindow");
  const [name] = useState(editingBb.name);
  const [specification] = useState(editingBb.specification);
  const [price] = useState(editingBb.price);

  const handleSave = () => {
    console.log("re-render handleSave");
    const updatedBb = bb.map((item) =>
      item.id === editingBb.id
        ? {
            ...item,
            name: document.getElementById("nameAnnouncement").value,
            specification: document.getElementById("specification").value,
            price: document.getElementById("price").value,
          }
        : item
    );
    setBb(updatedBb);
    localStorage.setItem("Announcement", JSON.stringify(updatedBb));
    setModalWindow(false);
  };

  return (
    <div className="modalWindov">
      <div className="modalWindovItems">
        <h1>Редактирование объявления</h1>
        <InputNameAnnouncement name={name} />
        <TextareaSpecification id="specification" spec={specification} />
        <InputPrice price={price} />
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={() => setModalWindow(false)}>Отмена</button>
      </div>
    </div>
  );
}
