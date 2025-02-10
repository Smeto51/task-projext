//'use client'

import Link from "next/link";
//import { use } from "react";


async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await res.json();
  return result;
}




export default async function Home() { //Это работает, но не совместимо с next.js а имеено async
  const posts = await fetchData();
  //console.log(res);
  return (
    <div>
      <h1>Главная страница</h1>
      {posts.map(el => (
        <div key={el.id} className="post">
          <h2>{el.title}</h2>
          <p>{el.body}</p>
          <Link href={`/post/` + el.id}>Детальнее</Link>
        </div>
      ))}
    </div>
  );
}
