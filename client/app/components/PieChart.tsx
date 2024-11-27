import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ChartData } from '../../types'
import { getColorFromPalette, getKeysAndValues } from '../utils'

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const LOW_LIMIT = 7;

function aggregateBelow(keys: string[], values: number[], limit: number): [string[], number[]] {
  const resultKeys: string[] = [];
  const resultValues: number[] = [];

  let othersSum = 0;

  keys.forEach((key, index) => {
    if (values[index] < limit) {
      othersSum += values[index];
    } else {
      resultKeys.push(key);
      resultValues.push(values[index]);
    }
  });

  if (othersSum > 0) {
    resultKeys.push("Others");
    resultValues.push(othersSum);
  }

  return [resultKeys, resultValues];
}

type Props = {
  quoteCount: [string, number][]
}

const options = {
  plugins: {
    legend: {
      display: false
    }
  }
}


const PieChart = ({ quoteCount }: Props): JSX.Element => {
  const [keys, values] = getKeysAndValues(quoteCount);
  const [newKeys, newValues] = aggregateBelow(keys, values, LOW_LIMIT)

  const max = Math.max(...values)
  const palette = ["#ecf0f1", "#f3ba2f", "#50AF95", "#4BC0C0", "#2a71d0"]
  const colors = newValues.map(n => getColorFromPalette(n / max, palette));

  const data = new ChartData(newKeys, newValues, colors)
  data.borderColor = "black"
  data.borderWidth = 2

  return (
    <Doughnut data={data} options={options} />
  );
};

export default PieChart;
