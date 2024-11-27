import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ChartData } from '../../types'
import { getColorFromPalette, getKeysAndValues } from '../utils'

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const LOW_LIMIT = 10;

type Props = {
  quoteCount: [string, number][]
}

const PieChart = ({ quoteCount }: Props): JSX.Element => {
  const filtered = quoteCount.filter(([key, value]) => value >= LOW_LIMIT)
  const { keys, values } = getKeysAndValues(filtered);

  const max = Math.max(...values)
  const palette = ["#4BC0C0", "#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"]
  const colors = values.map(n => getColorFromPalette(n / max, palette));

  const data = new ChartData(keys, values, colors)
  data.borderColor = "black"
  data.borderWidth = 2

  return (
    <Pie data={data} />
  );
};

export default PieChart;
