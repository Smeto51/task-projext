//'use client'

import Link from "next/link";
import { lusitana } from '@/app/ui/fonts';

async function fetchData() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  //const res = await fetch("https://api.vercel.app/blog");
  const result = res.json();
  return result;
}

export default async function Home() {
  const posts = await fetchData();
  return (
    <div>
      <h1>Главная страница</h1>
      <p className={`${lusitana.className}`}>Добро пожаловать</p>
      {posts.map((el) => (
        //<div key={el.id} className="post">
        <div key={el.id} className="post">
          <h2>{el.title}</h2>
          <p>{el.body}</p>
          <Link href={`/post/` + el.id}>Детальнее</Link>
        </div>
      ))}
    </div>
  );
}
