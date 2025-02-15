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

  let f;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saveAnnouncement =
        JSON.parse(localStorage.getItem("Announcement")) || [];

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

  /*useEffect(() => {
    filterBbByPrice();
  }, []);

  const filterBbByPrice = () => {
    const filtered = bb.filter((bf) => {
      const price = parseFloat(bf.price);
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : +Infinity;
      return price >= min && price <= max;
    });
    //setFilterBb(filtered);
  };*/

  if (!isLoading) {
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
          <button className="blue" onClick={() => sortBbByPrice("asc")}>
            Сортировать по возрастанию цены
          </button>
          <button className="blue" onClick={() => sortBbByPrice("desc")}>
            Сортировать по убыванию цены
          </button>
        </div>

        {(f = filterBb.length > 0 ? filterBb : bb)}

        {f.length > 0 ? (
          (console.log(filterBb),
          console.log(bb),
          //console.log(f),
          bb.map((bb) => (
            <div key={bb.id} className="post">
              <h2>{bb.name}</h2>
              <p>{bb.specification}</p>
              <p>{bb.price} rub</p>
            </div>
          )))
        ) : (
          <p>Объявлений сейчас нет</p>
        )}
      </div>
    );
  }
}
