import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartData } from '../../types'
import { getColorFromPalette, getKeysAndValues } from '../utils'

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const LOW_LIMIT = 7;

type Props = {
  quoteCount: [string, number][]
}

const options = {
  scales: {
    y: { beginAtZero: true },
    x: { display: true },
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

const BarChart = ({ quoteCount }: Props): JSX.Element => {
  const filtered = quoteCount.filter(([key, value]) => value >= LOW_LIMIT)
  const [keys, values] = getKeysAndValues(filtered);

  const max = Math.max(...values)
  const colors = values.map(n => getColorFromPalette(n / max));
  const data = new ChartData(keys, values, colors)

  return (
    <Bar data={data} options={options} />
  );
};

export default BarChart;
