"use client";
import React, { useEffect, useState } from "react";
import CurrencyBlock from "../components/CurrencyBlock";
import "./fetch.css";

const API_KEY_CURRENCY = "998ea5243428428a9c8c6199c5602cb6";
const API_KEY_WEATHER = "d345de8088fcd5858702b7a64416eb36";

const weatherDirectory = (description) => {
  switch (description) {
    case "overcast clouds":
      return "Пасмурные облака";
    case "light rain":
      return "Небольшой дождь";
    case "broken clouds":
      return "Облачно с прояснениями";
    default:
      return description;
  }
};

const WeatherBlock = (
  { city, temperature, wind, description, icon, country },
  src
) => (
  (description = weatherDirectory(description)),
  country != undefined ? (src = country.toLowerCase()) : "",
  (
    //console.log(country),
    <div className="block">
      <h1>
        {city} ({country}{" "}
        <img src={`https://flagcdn.com/w20/${src}.png`} className="country" />)
      </h1>

      <p>
        {temperature} °C
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          className="weather"
        />
      </p>
      <p>Ветер: {wind} м.с</p>
      <p>{description}</p>
    </div>
  )
);

const Fetch = () => {
  const [currencies, setCurrencies] = useState([]);
  const [openexchangerates, setOpenexchangerates] = useState([]);
  const [weather, setWeather] = useState([]);

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
    /* ----------------------------------------------------- */
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => response.json())
      .then((data) => {
        const currencyItems = Object.values(data.Valute);
        setCurrencies(currencyItems.slice(0, 5));
      })
      .catch((error) => console.error("Ошибка при загрузке данных: ", error));
    /* ----------------------------------------------------- */
    /*const cities = "Murmansk";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${API_KEY_WEATHER}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather({
          city: cities,
          country: data.sys.country,
          temperature: data.main.temp,
          wind: data.wind.speed,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      })
      .catch((error) => console.error("Ошибка при загрузке данных: ", error));*/
    /* ----------------------------------------------------- */
    const cities = ["Murmansk ", "Minsk ", "Paris", "London", "Kyiv"];
    const requestsPromise = cities.map((city) =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`
      ).then((response) => response.json())
    );
    //console.log("requestsPromise="+requestsPromise)
    Promise.all(requestsPromise)
      .then((data) => {
        const weather = data.map((item) =>
          //console.log("item = "+ item.name),
          //console.log("country = "+ item.sys.country),
          ({
            city: item.name,
            country: item.sys.country,
            temperature: item.main.temp,
            wind: item.wind.speed,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          })
        );
        setWeather(weather);
      })
      .catch((error) => console.error("Ошибка при загрузке данных: ", error));
  }, []);
  //Какой способ использования блоков лучше???
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
      <div className="blocks">
        <h1>Погода Openweathermap</h1>
        {weather.map((weather, index) => (
          <WeatherBlock
            key={index}
            city={weather.city}
            country={weather.country}
            temperature={weather.temperature}
            wind={weather.wind}
            description={weather.description}
            icon={weather.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Fetch;
