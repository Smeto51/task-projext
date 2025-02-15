"use client";
import Link from "next/link";

const Header = () => {
  const handleClearBoard = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      alert("Доска объявлений очищена!");
    }
  };

  return (
    <header>
      <strong>Тестирование Сайта</strong>
      <nav>
        <Link href="/">Главная</Link>
        <Link href="/about">About</Link>
        <Link href="/form">Добавить объявление</Link>
        <Link href="/bb">Доска объявлений</Link>
        <Link href="" onClick={handleClearBoard} style={{marginRight: 70}}>
          Очистить доску
        </Link>
      </nav>
    </header>
  );
};

export default Header;
