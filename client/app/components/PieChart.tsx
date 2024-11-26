import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ChartData } from '../../types'

ChartJS.register(Title, Tooltip, Legend, ArcElement);

type Props = {
  chartData: ChartData
}

const PieChart = ({ chartData }: Props) => {

  const [data] = useState({
    labels: [
      "Fred Brooks",
      "Edsger W. Dijkstra",
      "Douglas Crockford",
      "Alan Perlis",
      "Daniel T. Barry"
    ],
    datasets: [
      {
        label: "Quotes by author",
        data: [
          35,
          23,
          17,
          17,
          17
        ],
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
    <Pie data={chartData} />
  );
};

export default PieChart;
