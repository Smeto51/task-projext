"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import CurrencyBlock from "../components/CurrencyBlock";
import "./fetch.css";
import { Chart, registerables } from "chart.js";
import { BarCBRF, BarOpenexchangerates, BarOpenweathermap } from "./bar";
Chart.register(...registerables);

const API_KEY_CURRENCY = "998ea5243428428a9c8c6199c5602cb6";
const API_KEY_WEATHER = "d345de8088fcd5858702b7a64416eb36";

const weatherDirectory = (description) => {
  console.log("re-render weatherDirectory");
  switch (description) {
    case "overcast clouds":
      return "Пасмурные облака";
    case "light rain":
      return "Небольшой дождь";
    case "broken clouds":
      return "Облачно с прояснениями";
    case "light snow":
      return "Лёгкий снег";
    case "clear sky":
      return "Чистое небо";
    case "scattered clouds":
      return "Рассеяные облака";
    default:
      return description;
  }
};

const WeatherBlock = React.memo(
  ({ city, temperature, wind, description, icon, country }) => {
    const translatedDescription = weatherDirectory(description);
    const flagSrc = country ? country.toLowerCase() : "";

    return (
      <div className="block">
        <h1>
          {city} ({country}{" "}
          <img src={`https://flagcdn.com/w20/${flagSrc}.png`} className="country" />)
        </h1>
        <p>
          {temperature} °C
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            className="weather"
          />
        </p>
        <p>Ветер: {wind} м.с</p>
        <p>{translatedDescription}</p>
      </div>
    );
  }
);

const Fetch = () => {
  const [currencies, setCurrencies] = useState([]);
  const [openexchangerates, setOpenexchangerates] = useState([]);
  const [weather, setWeather] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Render Fetch");

  const FetchApi = useCallback(async () => {
    try {
      console.log("FetchApi called");

      // Запрос к openexchangerates
      const ratesResponse = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${API_KEY_CURRENCY}`
      );
      const ratesData = await ratesResponse.json();
      const rates = ratesData.rates;

      setOpenexchangerates([
        { currency: "AED", rate: rates.AED },
        { currency: "RUB", rate: rates.RUB },
        { currency: "SEK", rate: rates.SEK },
        { currency: "THB", rate: rates.THB },
        { currency: "BYN", rate: rates.BYN },
      ]);

      // Запрос к ЦБ РФ
      const cbrResponse = await fetch("https://www.cbr-xml-daily.ru/daily_json.js");
      const cbrData = await cbrResponse.json();
      const currencyItems = Object.values(cbrData.Valute);
      setCurrencies(currencyItems.slice(0, 5));
    } catch (error) {
      console.error("Ошибка при загрузке данных: ", error);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      console.log("Loading ...");
      return;
    }
    FetchApi();
  }, [update, isLoading, FetchApi]);

  const handleButtonUpdate = useCallback(() => {
    console.log("Обновление данных");
    setUpdate((prev) => !prev);
  }, []);

  // Мемоизация данных
  const memoizedOpenexchangerates = useMemo(() => openexchangerates, [openexchangerates]);
  const memoizedCurrencies = useMemo(() => currencies, [currencies]);
  const memoizedWeather = useMemo(() => weather, [weather]);

  if (!isLoading) {
    return (
      <div>
        <div className="container">
          <div className="blocks">
            <h1>Курсы валют ЦБ РФ</h1>
            {memoizedCurrencies.map((currency) => (
              <CurrencyBlock key={currency.ID} currency={currency} />
            ))}
          </div>

          <div className="blocks" style={{ marginTop: "20px" }}>
            <h1>Курсы валют Openexchangerates USD</h1>
            {memoizedOpenexchangerates.map((openex) => (
              <div key={openex.currency} className="block2">
                <h1>{openex.currency}</h1>
                <h1>Курс: {openex.rate}</h1>
              </div>
            ))}
          </div>

          <button className="buttonWorkedForm" onClick={handleButtonUpdate}>
            Обновить данные
          </button>
        </div>
      </div>
    );
  }

  return null; // Возвращаем null, если данные загружаются
};

export default Fetch;