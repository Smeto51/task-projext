/*'use Client'

import { useState } from "react"*/

import Link from "next/link"

export default function Show() {
    return (
        <div>
            <h1>Show страница</h1>
            <Link href='/'>Главная</Link><br/>
            <Link href='/client/1234'>Клиент 1 2 3 4</Link>
        </div> 
    ) 
  }