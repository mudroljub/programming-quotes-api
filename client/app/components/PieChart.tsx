import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ChartData } from '../../types'

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const LOW_LIMIT = 10;

type Props = {
  quoteCount: [string, number][]
}

const PieChart = ({ quoteCount }: Props): JSX.Element => {

  const dict = new Map(
    quoteCount.filter(([key, value]) => value >= LOW_LIMIT)
  );

  const data : ChartData = {
    labels: Array.from(dict.keys()),
    datasets: [
      {
        label: "Quotes by author",
        data: Array.from(dict.values()),
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
  }

  return (
    <Pie data={data} />
  );
};

export default PieChart;
