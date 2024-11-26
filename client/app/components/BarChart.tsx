'use client'
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const getRandomColor = () => '#' + (Math.random() * 0xFFFFFF << 0).toString(16)

const LOW_LIMIT = 5;

const MyBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quotes by author",
        data: [],
        backgroundColor: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quotes');
        const quotes = await response.json();

        const authorCount = quotes.reduce((acc: any, quote: { author: string }) => {
          acc[quote.author] = (acc[quote.author] || 0) + 1;
          return acc;
        }, {});

        const filteredAuthors = Object.keys(authorCount)
          .filter(author => authorCount[author] >= LOW_LIMIT);
        const quoteCount = filteredAuthors.map(author => authorCount[author]);

        const randomColors = quoteCount.map(getRandomColor);

        setChartData({
          labels: filteredAuthors,
          datasets: [
            {
              label: "Quotes by author",
              data: quoteCount,
              backgroundColor: randomColors,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    scales: {
      y: {
        display: true,
        beginAtZero: true,
        max: Math.max(...chartData.datasets[0].data),
      },
      x: {
        display: true,
      },
    },
  };

  return (
    <div style={{ width: "1000px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MyBarChart;
