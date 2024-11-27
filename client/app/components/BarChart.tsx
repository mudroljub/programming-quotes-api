import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartData } from '../../types'
import { getColorFromPalette } from '../utils'

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const LOW_LIMIT = 10;

type Props = {
  quoteCount: [string, number][]
}

const options = {
  scales: {
    y: { beginAtZero: true },
    x: { display: true },
  },
};

const BarChart = ({ quoteCount }: Props): JSX.Element => {
  const dict = new Map(
    quoteCount.filter(([key, value]) => value >= LOW_LIMIT)
  );

  const max = Math.max(...Array.from(dict.values()))

  const randomColors = Array.from(dict.values()).map(n => getColorFromPalette(n / max));

  const data : ChartData = {
    labels: Array.from(dict.keys()),
    datasets: [
      {
        label: "Quotes by author",
        data: Array.from(dict.values()),
        backgroundColor: randomColors,
      },
    ],
  }

  return (
    <Bar data={data} options={options} />
  );
};

export default BarChart;
