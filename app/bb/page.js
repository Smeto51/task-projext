"use client";

import { useEffect, useState } from "react";
import "./bb.css";

export default function Bulletin_board() {
  let [bb, setBb] = useState([]);
  let [sortPrice, setSortPrice] = useState("asc");
  let [isLoading, setIsLoading] = useState(true);

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

    localStorage.setItem("sortOrder", order);
  };

  if (!isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Доска объявлений</h1>
        <div className="sort-buttons">
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

/**
export default async function Home() {
  const posts = await fetchData();
  return (
    <div>
      <h1>Главная страница</h1>
      {posts.map((el) => (
        //<div key={el.id} className="post">
        <div key={el.id} className="post">
          <h2>{el.title}</h2>
          <p>{el.body}</p>
          <Link href={`/post/` + el.id}>Детальнее</Link>
        </div>
      ))}
    </div> */
