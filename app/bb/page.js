"use client";

import { useEffect, useState } from "react";
import "./bb.css";

export default function Bulletin_board() {
  let [bb, setBb] = useState([]);
  let [sortPrice, setSortPrice] = useState("asc");
  let [isLoading, setIsLoading] = useState(true);
  
  let [minPrice, setMinPrice] = useState("");
  let [maxPrice, setMaxPrice] = useState("");

  let [filterBb, setFilterBb] = useState("");




  useEffect(() => {
    if (typeof window !== "undefined") {
      const saveAnnouncement =
        JSON.parse(localStorage.getItem("Announcement")) || [];
      
      //* setFilterBb(saveAnnouncement);
      setBb(saveAnnouncement);
      setIsLoading(false);
    }
  }, []);

  const sortBbByPrice = (order) => {
    const sortedBb = [...bb].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setBb(sortedBb);
    setSortPrice(order);
  };

const filterBbByPrice = () => {
  
}



  if (!isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Доска объявлений</h1>
        <div>
          <button className="blue" onClick={() => sortBbByPrice("asc")}>
            Сортировать по возрастанию цены
          </button>
          <button className="blue" onClick={() => sortBbByPrice("desc")}>
            Сортировать по убыванию цены
          </button>
        </div>
        {bb.length > 0 ? (
          bb.map((bb) => (
            <div key={bb.id} className="post">
              <h2>{bb.name}</h2>
              <p>{bb.specification}</p>
              <p>{bb.price} rub</p>
            </div>
          ))
        ) : (
          <p>Объявлений сейчас нет</p>
        )}
      </div>
    );
  }
}

