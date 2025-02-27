"use client";
import { useMemo, useState } from "react";
import "./ModalWindow.css";
import {
  InputNameAnnouncement,
  InputPrice,
  TextareaSpecification,
} from "../components/AnnouncementForm";

export default function ModalWindow({ setModalWindow, editingBb, setBb, bb }) {
  const handleSave = () => {
    const name = document.getElementById("nameAnnouncement").value;
    const specification = document.getElementById("specification").value;
    const price = document.getElementById("price").value;
    if (
      name === editingBb.name &&
      specification === editingBb.specification &&
      price === editingBb.price
    ) {
      setModalWindow(false);
      return;
    }
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
        <h1 className="Centr">Редактирование объявления</h1>

        <InputNameAnnouncement name={editingBb.name} />
        <TextareaSpecification
          id="specification"
          spec={editingBb.specification}
        />
        <InputPrice price={editingBb.price} />

        <button className="buttonBlue" onClick={handleSave}>
          Сохранить
        </button>
        <button className="buttonBlue" onClick={() => setModalWindow(false)}>
          Отмена
        </button>
      </div>
    </div>
  );
}
