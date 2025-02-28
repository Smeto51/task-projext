"use client";
import { useMemo, useState } from "react";
import "./ModalWindow.css";
import {
  InputNameAnnouncement,
  InputPrice,
  TextareaSpecification,
} from "../components/AnnouncementForm";

export default function ModalWindow({ setModalWindow, editingBulletinboard, setBulletinboard, bb }) {
  const handleSave = () => {
    const name = document.getElementById("nameAnnouncement").value;
    const specification = document.getElementById("specification").value;
    const price = document.getElementById("price").value;
    if (
      name === editingBulletinboard.name &&
      specification === editingBulletinboard.specification &&
      price === editingBulletinboard.price
    ) {
      setModalWindow(false);
      return;
    }
    const updatedBulletinboard = bb.map((item) =>
      item.id === editingBulletinboard.id
        ? {
            ...item,
            name: document.getElementById("nameAnnouncement").value,
            specification: document.getElementById("specification").value,
            price: document.getElementById("price").value,
          }
        : item
    );
    setBulletinboard(updatedBulletinboard);
    localStorage.setItem("Announcement", JSON.stringify(updatedBulletinboard));
    setModalWindow(false);
  };

  return (
    <div className="modalWindov">
      <div className="modalWindovItems">
        <h1 className="Centr">Редактирование объявления</h1>

        <InputNameAnnouncement name={editingBulletinboard.name} />
        <TextareaSpecification
          id="specification"
          spec={editingBulletinboard.specification}
        />
        <InputPrice price={editingBulletinboard.price} />

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
