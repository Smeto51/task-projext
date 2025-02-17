"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { handleDelete } from "../ui/deleteItems";

// Фильтрация объявлений по цене
const filterBbByPrice = (bb, setFilterBb, minPrice, maxPrice) => {
  const filtered = bb.filter((unit) => {
    const price = parseFloat(unit.price);
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : +Infinity;
    return price >= min && price <= max;
  });
  setFilterBb(filtered);
};

const sortBbByPrice = (order, temp_bb, setFilterBb) => {
  const sortedBb = [...temp_bb].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
  setFilterBb(sortedBb);
};

export default function Bulletin_board() {
  let [bb, setBb] = useState([]);

  let [isLoading, setIsLoading] = useState(true);

  let [minPrice, setMinPrice] = useState("");
  let [maxPrice, setMaxPrice] = useState("");
  let [filterBb, setFilterBb] = useState([]);

  let displayBb;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saveAnnouncement =
        JSON.parse(localStorage.getItem("Announcement")) || [];
      setBb(saveAnnouncement);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    filterBbByPrice(bb, setFilterBb, minPrice, maxPrice);
  }, [minPrice, maxPrice, bb]);

  if (!isLoading) {
    displayBb =
      filterBb.length > 0 ? filterBb : minPrice || maxPrice ? filterBb : bb;
    return (
      <div style={{ textAlign: "center" }}>
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
          <button
            className="blue"
            onClick={() => sortBbByPrice("asc", displayBb, setFilterBb)}
          >
            Сортировать по возрастанию цены
          </button>
          <button
            className="blue"
            onClick={() => sortBbByPrice("desc", displayBb, setFilterBb)}
          >
            Сортировать по убыванию цены
          </button>
        </div>

        {displayBb.length > 0 ? (
          displayBb.map((temp_bb) => (
            <div key={temp_bb.id} className="post">
              <h2>{temp_bb.name}</h2>
              <p>{temp_bb.specification}</p>
              <p>{temp_bb.price} rub</p>
              <Link href="">Редактировать</Link>
              <Link
                href=""
                onClick={() => handleDelete(temp_bb.id, bb, setBb)}
              >
                Удалить
              </Link>
            </div>
          ))
        ) : (
          <p>Объявлений сейчас нет</p>
        )}
      </div>
    );
  }
}
