'use client'
import { useState } from "react";
import "./ModalWindow.css";

const handleCloseModal = (setModalWindow) => {
    setModalWindow(false); 
}

const handleSave = (bb, editingBb) => {
    const updatedBb = bb.map((item) =>
        item.id === editingBb.id ? {...item, name, specification, price} : item);
    //setBb(updatedBb);
    localStorage.setItem("Announcement", JSON.stringify(updatedBb));
    modalWindow(false);
};


export default function modalWindow({setModalWindow, editingBb, bb, setBb}) {
  const [nameAnnouncement, setNameAnnouncement] = useState(editingBb.name);
  const [specification, setSpecification] = useState(editingBb.specification || "");
  const [price, setPrice] = useState(editingBb.price);
  return (
    <div className="modalWindov">
      <div className="modalWindovItems">
        <h1>Редактирование объявления</h1>
        
        <input 
        type="text" 
        placeholder="Название"
        value={nameAnnouncement}
        onChange={(name) => setNameAnnouncement(name.target.value)}
        />
        
        <textarea rows={5} 
        placeholder="Описание"
        value={specification}
        onChange={(specification)=>setSpecification(specification.target.value)} />
        
        <input
          style={{ marginBottom: "10px", marginTop: "5px" }}
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(price)=>(setPrice(price.target.value))}
        />
        <button onClick={() => handleSave(bb,editingBb)}>Сохранить</button>
        <button onClick={() => handleCloseModal(setModalWindow)}>Отмена</button>
      </div>
    </div>
  );
}
