"use client";

import { useEffect, useState } from "react";
import "../bb/bb.css";
import Link from "next/link";

// Фильтрация объявлений по цене
const filterBbByPrice = (bb, setFilterBb, minPrice, maxPrice) => {
  console.log("minPrice=" + minPrice);
  console.log("maxPrice=" + maxPrice);
  const filtered = bb.filter((bf) => {
    const price = parseFloat(bf.price);
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : +Infinity;
    return price >= min && price <= max;
  });
  setFilterBb(filtered);
};

const sortBbByPrice = (order,temp_bb,setFilterBb) => {
  const sortedBb = [...temp_bb].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
  setFilterBb(sortedBb);
};

export default function Bulletin_board() {
    let [bb, setBb] = useState([]);
    //let [sortPrice, setSortPrice] = useState("asc");
    let [isLoading, setIsLoading] = useState(true);
  
    let [minPrice, setMinPrice] = useState("");
    let [maxPrice, setMaxPrice] = useState("");
  
    let [filterBb, setFilterBb] = useState([]);
  
    let displayBb;
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        console.log("test2");
        const saveAnnouncement =
          JSON.parse(localStorage.getItem("Announcement")) || [];
        setBb(saveAnnouncement);
        setIsLoading(false);
      }
    }, []);
  
    useEffect(() => {
      console.log("test");
      filterBbByPrice(bb, setFilterBb, minPrice, maxPrice);
    }, [minPrice, maxPrice]);
  
    if (!isLoading) {
      console.log("filterBb.length=" + filterBb.length);
      console.log("bb.length=" + bb.length);
      displayBb =
        filterBb.length > 0 ? filterBb : minPrice || maxPrice ? filterBb : bb;
        console.log("Dispalay.length=" + displayBb.length);
      return (
        <div style={{ textAlign: "center" }}>
          <h1>Доска объявлений</h1>
          <div className="filter">
            <input
              type="number"
              placeholder="Минималная цена"
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
            <button className="blue" onClick={() => sortBbByPrice("asc",displayBb, setFilterBb)}>
              Сортировать по возрастанию цены
            </button>
            <button className="blue" onClick={() => sortBbByPrice("desc",displayBb, setFilterBb)}>
              Сортировать по убыванию цены
            </button>
          </div>
  
          {displayBb.length > 0 ? (
            displayBb.map((bb) => (
              <div key={bb.id} className="post">
                <h2>{bb.name}</h2>
                <p>{bb.specification}</p>
                <p>{bb.price} rub</p>
                <Link href="">Редактировать</Link>
                <Link href="">Удалить</Link>
              </div>
            ))
          ) : (
            <p>Объявлений сейчас нет</p>
          )}
        </div>
      );
    }
  }

