"use client";
import React, { useEffect, useState } from "react";
import CurrencyBlock from "../components/CurrencyBlock";
import "./fetch.css";

const API_KEY_CURRENCY = "998ea5243428428a9c8c6199c5602cb6";

const Fetch = () => {
  const [currencies, setCurrencies] = useState([]);
  const [openexchangerates, setOpenexchangerates] = useState([]);

  //openexchangerates
  useEffect(() => {
    fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${API_KEY_CURRENCY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const rates = data.rates;
        setOpenexchangerates([
          { currency: "AUD", rate: rates.AUD },
          { currency: "AZN", rate: rates.AZN },
          { currency: "GBP", rate: rates.GBP },
          { currency: "AMD", rate: rates.AMD },
          { currency: "BYN", rate: rates.BYN },
        ]);
      });

    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => response.json())
      .then((data) => {
        const currencyItems = Object.values(data.Valute);
        //console.log("currencyItems="+currencyItems);
        setCurrencies(currencyItems.slice(0, 5));
      })
      .catch((error) => console.error("Ошибка при загрузке данных: ", error));
  }, []);

  return (
    <div className="container">
      <div className="blocks">
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          Курсы валют ЦБ РФ
        </h1>
        {currencies.map((currency) => (
          <CurrencyBlock key={currency.ID} currency={currency} />
        ))}
      </div>
      <div className="blocks">
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          Курсы валют Openexchangerates USD
        </h1>
        {openexchangerates.map((openex) => (
          <div key={openex.currency} className="block2">
            <h1>{openex.currency}</h1>
            <h1>Курс: {openex.rate}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetch;
