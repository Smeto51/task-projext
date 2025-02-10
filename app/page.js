'use client'
import Link from "next/link";
import { useState } from "react";


async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await res.json();
  return result;
}

function MouseClickButton () {
  'use strict';
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Вы нажали {count} раз</p>
      <button onClick={() => setCount(count + 1)}>
        Нажми на меня
      </button>
    </div>
  ) 
}

export default async function Home() {
  const posts = await fetchData();
  //console.log(res);
  return (
    <div>
      <h1>Главная страница</h1>
      {posts.map(el => (
        <div key={el.id} className="post">
          <h2>{el.title}</h2>
          <p>{el.body}</p>
          <Link href={`/post/` + el.title}>Детальнее</Link>
        </div>
      ))}
    </div>
  );
}
