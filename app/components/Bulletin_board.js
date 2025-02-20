"use client";
import { useEffect, useState } from "react";
import ModalWindow from "../ui/ModalWindowBb";
import { BulletinBloack } from "./BulletinBloack";

const filterBbByPrice = (bb, minPrice, maxPrice) => {
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
  //event.preventDefault();
  setEditingBb(itemBb);
  setModalWindow(true);
};

export default function Bulletin_board() {
  let [bb, setBb] = useState([]);
  const [sortPrice, setSortPrice] = useState("asc");
  let [isLoading, setIsLoading] = useState(true);

  let [minPrice, setMinPrice] = useState("");
  let [maxPrice, setMaxPrice] = useState("");
  let [filterBb, setFilterBb] = useState([]);

  const [modalOpen, setModalWindow] = useState(false);
  const [editingBb, setEditingBb] = useState(null);

  let displayBb = [];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saveAnnouncement =
        JSON.parse(localStorage.getItem("Announcement")) || [];
      setBb(saveAnnouncement);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let filteredBb = filterBbByPrice(bb, minPrice, maxPrice);
    let sortedBb = sortBbByPrice(sortPrice, filteredBb);
    setFilterBb(sortedBb);
  }, [minPrice, maxPrice, bb, sortPrice]);

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
          <button className="blue" onClick={() => setSortPrice("asc")}>
            Сортировать по возрастанию цены
          </button>
          <button className="blue" onClick={() => setSortPrice("desc")}>
            Сортировать по убыванию цены
          </button>
        </div>

        {displayBb.length > 0 ? (
          displayBb.map((temp_bb) => (
            <BulletinBloack key={temp_bb.id} temp_bb={temp_bb}
            bb={bb}
            setBb={setBb}
            setModalWindow={setModalWindow}
            setEditingBb={setEditingBb}
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

/*<div>
<Link
  href=""
  onClick={() =>
    handleEdit(temp_bb, setModalWindow, setEditingBb)
  }
>
  Редактировать
</Link>
<Link href="" onClick={() => handleDelete(temp_bb.id, bb, setBb)}>
  Удалить
</Link>
</div>*/