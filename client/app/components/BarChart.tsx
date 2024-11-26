import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartData } from '../../types'

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

type Props = {
  chartData: ChartData
}

const options = {
  scales: {
    y: { beginAtZero: true },
    x: { display: true },
  },
};

const BarChart = ({ chartData }: Props) => {
  console.log(chartData);
  
  return (
    <Bar data={chartData} options={options} />
  );
};

export default BarChart;
