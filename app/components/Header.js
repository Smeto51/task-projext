//import React from "react";
import Link from "next/link"

const Header = () => {
    return (
        <header>
            <strong>Тестирование Сайта</strong>
            <nav>
                <Link href="/">Главная</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>    )     
}

export default Header