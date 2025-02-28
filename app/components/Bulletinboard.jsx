"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import ModalWindow from "../ui/ModalWindowBulletinboard";
import { BulletinBlock } from "./BulletinBlock";

const filterBulletinboardByPrice = (bulletinboard, minPrice, maxPrice) => {
  return bulletinboard.filter((item) => {
    const price = parseFloat(item.price);
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : +Infinity;
    return price >= min && price <= max;
  });
};

const sortBulletinboardByPrice = (order, temp_bulletinboard) => {
  return [...temp_bulletinboard].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
};

export const handleEdit = (
  itemBulletinboard,
  setModalWindow,
  setEditingBulletinboard
) => {
  setEditingBulletinboard(itemBulletinboard);
  setModalWindow(true);
};

const handleClearBoard = (setBulletinboard) => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    setBulletinboard([]);
    alert("Доска объявлений очищена!");
  }
};

export default function Bulletinboard() {
  let [bulletinboard, setBulletinboard] = useState([]);
  const [sortPrice, setSortPrice] = useState("asc");
  let [isLoading, setIsLoading] = useState(true);
  let [minPrice, setMinPrice] = useState("");
  let [maxPrice, setMaxPrice] = useState("");

  const [modalOpen, setModalWindow] = useState(false);
  const [editingBulletinboard, setEditingBulletinboard] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saveAnnouncement =
        JSON.parse(localStorage.getItem("Announcement")) || [];
      setBulletinboard(saveAnnouncement);
      setIsLoading(false);
    }
  }, []);

  const filteredBulletinboard = useMemo(() => {
    if (isLoading) return [];
    if (minPrice == "" && maxPrice == "") return bulletinboard;
    return filterBulletinboardByPrice(bulletinboard, minPrice, maxPrice);
  }, [minPrice, maxPrice, bulletinboard]);

  const sortedBulletinboard = useMemo(() => {
    if (isLoading) return [];
    return sortBulletinboardByPrice(sortPrice, filteredBulletinboard);
  }, [sortPrice, filteredBulletinboard]);

  const handleSortAsc = useCallback(() => setSortPrice("asc"), []);
  const handleSortDesc = useCallback(() => setSortPrice("desc"), []);

  const handleClearMemoized = useCallback(() => {
    handleClearBoard(setBulletinboard);
  }, []);

  const handleEditMemoized = useCallback(
    (itemBulletinboard) =>
      handleEdit(itemBulletinboard, setModalWindow, setEditingBulletinboard),
    [setModalWindow, setEditingBulletinboard]
  );

  if (!isLoading) {
    const displayBulletinboard =
      sortedBulletinboard.length > 0
        ? sortedBulletinboard
        : minPrice || maxPrice
        ? sortedBulletinboard
        : bulletinboard;
    return (
      <div style={{ textAlign: "center" }}>
        <div className="fixedRight">
          <button type="button" className="blue" onClick={handleClearMemoized}>
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

        {displayBulletinboard.length > 0 ? (
          displayBulletinboard.map((temp_bulletinboard) => (
            <BulletinBlock
              key={temp_bulletinboard.id}
              temp_bulletinboard={temp_bulletinboard}
              bulletinboard={bulletinboard}
              setBulletinboard={setBulletinboard}
              onEdit={handleEditMemoized}
            />
          ))
        ) : (
          <p>Объявлений сейчас нет</p>
        )}
        {modalOpen && (
          <ModalWindow
            setModalWindow={setModalWindow}
            editingBulletinboard={editingBulletinboard}
            bulletinboard={bulletinboard}
            setBulletinboard={setBulletinboard}
          ></ModalWindow>
        )}
      </div>
    );
  }
}
