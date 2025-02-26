"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import ModalWindow from "../ui/ModalWindowBb";
import { BulletinBlock } from "./BulletinBlock";

const filterBbByPrice = (bb, minPrice, maxPrice) => {
  console.log("re-render filterBbByPrice");
  return bb.filter((item) => {
    const price = parseFloat(item.price);
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : +Infinity;
    return price >= min && price <= max;
  });
};

const sortBbByPrice = (order, temp_bb) => {
  return [...temp_bb].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
};

export const handleEdit = (itemBb, setModalWindow, setEditingBb) => {
  console.log("re-render handleEdit");
  setEditingBb(itemBb);
  setModalWindow(true);
};

const handleClearBoard = (setBb) => {
  console.log("re-render handleClearBoard");
  if (typeof window !== "undefined") {
    localStorage.clear();
    setBb([]);
    alert("Доска объявлений очищена!");
  }
};

export default function Bulletinboard() {
  console.log("re-render Bulletinboard");
  let [bb, setBb] = useState([]);
  const [sortPrice, setSortPrice] = useState("asc");
  let [isLoading, setIsLoading] = useState(true);
  let [minPrice, setMinPrice] = useState("");
  let [maxPrice, setMaxPrice] = useState("");

  const [modalOpen, setModalWindow] = useState(false);
  const [editingBb, setEditingBb] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saveAnnouncement =
        JSON.parse(localStorage.getItem("Announcement")) || [];
      setBb(saveAnnouncement);
      setIsLoading(false);
    }
  }, []);

  const filteredBb = useMemo(() => {
    if (isLoading) return [];
    if (minPrice == "" && maxPrice == "") return bb;
    return filterBbByPrice(bb, minPrice, maxPrice);
  }, [minPrice, maxPrice, bb]);

  const sortedBb = useMemo(() => {
    if (isLoading) return [];
    console.log("re-render sortBbByPrice");
    return sortBbByPrice(sortPrice, filteredBb);
  }, [sortPrice, filteredBb]);

  const handleSortAsc = useCallback(() => setSortPrice("asc"), []);
  const handleSortDesc = useCallback(() => setSortPrice("desc"), []);

  const handleClearMemoized = useCallback(() => {
    handleClearBoard(setBb);
  }, []);

  const handleEditMemoized = useCallback(
    (itemBb) => handleEdit(itemBb, setModalWindow, setEditingBb),
    [setModalWindow, setEditingBb]
  );

  if (!isLoading) {
    const displayBb =
      sortedBb.length > 0 ? sortedBb : minPrice || maxPrice ? sortedBb : bb;
    return (
      <div style={{ textAlign: "center" }}>
        <div className="fixedRight">
          <button
            type="button"
            className="blue"
            onClick={handleClearMemoized}
          >
            Очистить доску
          </button>
        </div>
        <h1>Доска объявлений</h1>
        <div className="filter">
          <input
            type="number"
            placeholder="Минимальная цена"
            value={minPrice}
            onChange={(min) => setMinPrice(min.target.value)}
          />
          <input
            type="number"
            placeholder="Максимальная цена"
            value={maxPrice}
            onChange={(max) => setMaxPrice(max.target.value)}
          />
        </div>

        <div>
          <button className="blue" onClick={handleSortAsc}>
            Сортировать по возрастанию цены
          </button>
          <button className="blue" onClick={handleSortDesc}>
            Сортировать по убыванию цены
          </button>
        </div>

        {displayBb.length > 0 ? (
          displayBb.map((temp_bb) => (
            <BulletinBlock
              key={temp_bb.id}
              temp_bb={temp_bb}
              bb={bb}
              setBb={setBb}
              onEdit={handleEditMemoized}
            />
          ))
        ) : (
          <p>Объявлений сейчас нет</p>
        )}
        {modalOpen && (
          <ModalWindow
            setModalWindow={setModalWindow}
            editingBb={editingBb}
            bb={bb}
            setBb={setBb}
          ></ModalWindow>
        )}
      </div>
    );
  }
}
