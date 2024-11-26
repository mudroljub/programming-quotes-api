import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Registracija potrebnih komponenti za Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Generisanje lažnih podataka
const generateFakeData = () => {
  return [
    { year: "2016", userGain: 500 },
    { year: "2017", userGain: 800 },
    { year: "2018", userGain: 1200 },
    { year: "2019", userGain: 1500 },
    { year: "2020", userGain: 2000 },
  ];
};

const PieChart: React.FC = () => {
  const fakeData = generateFakeData();

  const [chartData] = useState({
    labels: fakeData.map((dataItem) => dataItem.year),
    datasets: [
      {
        label: "Users Gained ",
        data: fakeData.map((dataItem) => dataItem.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
