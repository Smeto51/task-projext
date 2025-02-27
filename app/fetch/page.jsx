"use client";
import React, { useEffect, useState, useCallback } from "react";
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
    case "few clouds":
      return "Мало облаков";
    default:
      return description;
  }
};

const WeatherBlock = React.memo(
  ({ city, temperature, wind, description, icon, country }, src) => (
    country != undefined ? (src = country.toLowerCase()) : "",
    (
      //console.log(country),
      <div className="block">
        <h1>
          {city} ({country}{" "}
          <img src={`https://flagcdn.com/w20/${src}.png`} className="country" />
          )
        </h1>

        <p>
          {temperature} °C
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            className="weather"
          />
        </p>
        <p>Ветер: {wind} м.с</p>
        <p>{weatherDirectory(description)}</p>
      </div>
    )
  )
);

const NotDoubleRendingBar = React.memo(({apiData, Bar}) => (
  JSON.stringify(apiData) != "[]" ? (
    <Bar
      key={apiData}
      data={apiData}
    />
  ) : (
    (<p>Нет данных для графика</p>)
  )
))

const Fetch = () => {
  const [apiData, setApiData] = useState({
    currencies: [],
    openexchangerates: [],
    weather: [],
  });
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const FetchApi = useCallback(async () => {
    try {
      console.log("Вызов FetchApi");
      //Запрос к openexchangerates
      const openexchangeratesResponse = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${API_KEY_CURRENCY}`
      );
      const openexchangeratesData = await openexchangeratesResponse.json();
      const rates = openexchangeratesData.rates;

      //Запрос к ЦБ РФ
      const cbrRespone = await fetch(
        "https://www.cbr-xml-daily.ru/daily_json.js"
      );
      const cbrData = await cbrRespone.json();
      const currencyItems = Object.values(cbrData.Valute);

      //Запрос к Погоде
      const cities = ["Murmansk ", "Минск", "Paris", "Хургада", "Анталья"];
      const requestsPromiseWeather = cities.map((city) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_WEATHER}&units=metric`
        ).then((response) => response.json())
      );
      const weatherData = await Promise.all(requestsPromiseWeather);
      const weather = weatherData.map((item) => ({
        city: item.name,
        country: item.sys.country,
        temperature: item.main.temp,
        wind: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      }));

      setApiData((prev) => {
        const newCurrencies = currencyItems.slice(0, 5);
        const newOpenexchangerates = [
          { currency: "AED", rate: rates.AED },
          { currency: "RUB", rate: rates.RUB },
          { currency: "SEK", rate: rates.SEK },
          { currency: "THB", rate: rates.THB },
          { currency: "BYN", rate: rates.BYN },
        ];
        // Глубокое сравнение данных
        if (

          JSON.stringify(prev.currencies) === JSON.stringify(newCurrencies) &&
          JSON.stringify(prev.openexchangerates) === JSON.stringify(newOpenexchangerates) &&
          JSON.stringify(prev.weather) === JSON.stringify(weather)
        ) {
          
          return prev; // Данные не изменились, возвращаем предыдущее состояние
        }

        return {
          currencies: newCurrencies,
          openexchangerates: newOpenexchangerates,
          weather,
        };
      });
    } catch (error) {
      console.error("Ошибка при загрузке данных: ", error);
    }
    /*------------------------------------------------------*/
  }, []);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      console.log("Loading ...");
      return;
    } else {
      FetchApi();
    }

  }, [update, isLoading]);

  useEffect(() => {
    const interval = setInterval(
      FetchApi,
      5000
    );
    return () => clearInterval(interval);
  },[]);


  const handleButtonUpdate = useCallback(() => {
    setUpdate((update) => !update);
  }, []);
 
  //Какой способ использования блоков лучше???
  if (!isLoading) {
    return (
      <div>
        <div className="container">
          <div className="blocks">
            <h1 className="sizeCentr">Курсы валют ЦБ РФ</h1>
            {apiData.currencies.map((currency) => (
              <CurrencyBlock key={currency.ID} currency={currency} />
            ))}
          </div>
          
          <div className="bar">
            <NotDoubleRendingBar apiData={apiData.currencies} Bar={BarCBRF}/>
          </div>

          <div className="blocks" style={{ marginTop: "20px" }}>
            <h1 className="sizeCentr">Курсы валют Openexchangerates USD</h1>
            {apiData.openexchangerates.map((openex) => (
              <div key={openex.currency} className="block2">
                <h1>{openex.currency}</h1>
                <h1>Курс: {openex.rate}</h1>
              </div>
            ))}
          </div>
          <div className="bar" style={{marginTop: "20px"}}>
            <NotDoubleRendingBar apiData={apiData.openexchangerates} Bar={BarOpenexchangerates}/>
          </div>
          <div className="blocks" style={{ marginTop: "20px" }}>
            <h1 className="sizeCentr">Погода Openweathermap</h1>
            {apiData.weather.map((weather) => (
              <WeatherBlock
                key={weather.city}
                city={weather.city}
                country={weather.country}
                temperature={weather.temperature}
                wind={weather.wind}
                description={weather.description}
                icon={weather.icon}
              />
            ))}
          </div>

          <div className="bar" style={{marginTop: "20px"}}>
            <NotDoubleRendingBar apiData={apiData.weather} Bar={BarOpenweathermap}/>
          </div>
          <button className="buttonWorkedForm" onClick={handleButtonUpdate}>
            Обновить данные
          </button>
          <div className="blockButton" style={{ marginTop: "20px" }}></div>
        </div>
      </div>
    );
  }
};

export default Fetch;
