'use client'
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

// Funkcija za generisanje nasumičnih boja
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MyBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quotes by author",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        barPercentage: 1,
        borderRadius: { topLeft: 5, topRight: 5 },
      },
    ],
  });

  const CITATION_LIMIT = 4;  // Limit za broj citata po autoru

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quotes');
        const quotes = await response.json();
        
        // Prebroj citate po autoru
        const authorCount = quotes.reduce((acc: any, quote: { author: string }) => {
          acc[quote.author] = (acc[quote.author] || 0) + 1;
          return acc;
        }, {});

        // Filtriraj autore sa više od CITATION_LIMIT citata
        const filteredAuthors = Object.keys(authorCount).filter(author => authorCount[author] > CITATION_LIMIT);
        const filteredCounts = filteredAuthors.map(author => authorCount[author]);

        // Generisanje nasumičnih boja za svaki bar
        const randomColors = filteredAuthors.map(() => generateRandomColor());

        setChartData({
          labels: filteredAuthors,
          datasets: [
            {
              label: "Quotes by author",
              data: filteredCounts,
              backgroundColor: randomColors,  // Postavi nasumične boje
              borderColor: randomColors.map(color => color.replace('0.2', '1')),  // Povećaj alfa kanal za border
              borderWidth: 1,
              barPercentage: 1,
              borderRadius: { topLeft: 5, topRight: 5 },
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchData();
  }, []); // Prazan niz znači da se funkcija poziva samo jednom, pri mountovanju komponente

  const options = {
    scales: {
      y: {
        display: true,
        beginAtZero: true,
        max: Math.max(...chartData.datasets[0].data) + 10, // Automatski prilagodi maksimalnu vrednost na osnovu podataka
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
