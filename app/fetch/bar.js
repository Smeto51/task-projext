import { Chart, registerables, scales, Ticks } from "chart.js";
Chart.register(...registerables);
import { Bar } from "react-chartjs-2";

export const BarCBRF = ({ data: dCBRF }) => {
  // Данные для графика
  const dataCBRF = {
    labels: dCBRF.map((data) => data.Name),
    datasets: [
      {
        label: "RUB",
        data: dCBRF.map((data) => data.Value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };
  const a = "Иностранные валюты к рублю";
  // Настройки графика
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: xScaleConfig,
      y: {
        ticks: {
          color: "Black",
          font: {
            size: 20,
          },
        },
      },
    },
    plugins: titleConfig(a),
  };

  return <Bar data={dataCBRF} options={options} />;
};

const xScaleConfig = {
  ticks: {
    color: "Black",
    font: {
      size: 20,
    },
  },
};

const titleConfig = (a) => {
  return {
    title: {
      display: true,
      text: a,
      color: "Black",
      font: {
        size: 20,
      },
    },
  };
};

export const BarOpenexchangerates = ({ data: dOpenexchangerates }) => {
  // Данные для графика
  const Openexchangerates = {
    labels: dOpenexchangerates.map((data) => data.currency),
    datasets: [
      {
        label: "USD",
        data: dOpenexchangerates.map((data) => data.rate),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };
  // Настройки графика
  const a = "Курс (USD)";
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: xScaleConfig,
      y: {
        min: 0,
        max: 35,
        ticks: {
          color: "Black",
          font: {
            size: 20,
          },
        },
      },
    },
    plugins: titleConfig(a),
  };

  return <Bar data={Openexchangerates} options={options} />;
};

export const BarOpenweathermap = ({ data: dOpenweather }) => {
  const Openweathermap = {
    labels: dOpenweather.map(
      (data) => data.city
    ),
    datasets: [
      {
        label: "Погода в мире",
        data: dOpenweather.map((data) => data.temperature),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
      },
    ],
  };
  const a = "Погода";
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: xScaleConfig,
      y: {
        ticks: {
          color: "Black",
          font: {
            size: 20,
          },
        },
      },
    },
    plugins: titleConfig(a),
  };
  return <Bar data={Openweathermap} options={options} />;
};
