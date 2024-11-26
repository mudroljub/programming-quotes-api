'use client'
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";
import { getColorFromPalette } from '../utils'
import { Quote } from '../../types/quote'

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

const LOW_LIMIT = 6;

type ChartData = {
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string[] }[];
};

const MyBarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      { label: "Quotes by author", data: [], backgroundColor: [] },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quotes');
        if (!response.ok) throw new Error("Failed to fetch quotes");
        const quotes: Quote[] = await response.json();

        const authorCount = quotes.reduce<Record<string, number>>((acc, quote) => {
          acc[quote.author] = (acc[quote.author] || 0) + 1;
          return acc;
        }, {});

        const filteredAuthors = Object.keys(authorCount)
          .filter(author => authorCount[author] >= LOW_LIMIT)
          .sort((a, b) => authorCount[b] - authorCount[a]);

        const quoteCount = filteredAuthors.map(author => authorCount[author]);

        const max = Math.max(...quoteCount)
        const randomColors = quoteCount.map(n => getColorFromPalette(n / max));

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
      y: { beginAtZero: true },
      x: { display: true },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: "1000px" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MyBarChart;
