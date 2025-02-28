"use client";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <strong>Тестирование Сайта</strong>
      <nav>
        <Link href="/">Главная</Link>
        <Link href="/fetch">Курс Валют и погода(fetch)</Link>
        <Link href="/form">Добавить объявление</Link>
        <Link href="/bb" style={{ marginRight: 70 }}>
          Доска объявлений
        </Link>
      </nav>
    </header>
  );
};

export default Header;
