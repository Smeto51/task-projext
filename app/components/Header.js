"use client";
import Link from "next/link";
const handleClearBoard = () => {
  console.log("re-render handleClearBoard");
  if (typeof window !== "undefined") {
    localStorage.clear();
    alert("Доска объявлений очищена!");
  }
};

const Header = () => {
  console.log("re-render Header");
  return (
    <header>
      <strong>Тестирование Сайта</strong>
      <nav>
        <Link href="/">Главная</Link>
        <Link href="/fetch">Курс Валют и погода(fetch)</Link>
        <Link href="/form">Добавить объявление</Link>
        <Link href="/bb">Доска объявлений</Link>
        <Link
          href=""
          onClick={(a) => {
            a.preventDefault();
            handleClearBoard();
          }}
          style={{ marginRight: 70 }}
        >
          Очистить доску
        </Link>
      </nav>
    </header>
  );
};

export default Header;
