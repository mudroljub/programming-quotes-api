import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { ChartData } from '../../types'

ChartJS.register(Title, Tooltip, Legend, ArcElement);

type Props = {
  chartData: ChartData
}

const PieChart = ({ chartData }: Props) => {

  const updatedData = {
    ...chartData,
    datasets: [{
      ...chartData.datasets[0],
      backgroundColor: [
        "rgba(75,192,192,1)",
        "#ecf0f1",
        "#50AF95",
        "#f3ba2f",
        "#2a71d0",
      ],
      borderColor: "black",
      borderWidth: 2,
    }],
  };

  return (
    <Pie data={updatedData} />
  );
};

export default PieChart;
