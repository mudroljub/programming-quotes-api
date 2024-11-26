'use client'
import React, { useEffect, useState } from "react";
import BarChart from '../components/BarChart'
import PieChart from '../components/PieChart'
import { Quote, ChartData } from '../../types'
import { getColorFromPalette } from '../utils'

const LOW_LIMIT = 10;

export default function About(): JSX.Element {

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
        const randomColors = quoteCount.map(n => getColorFromPalette((n-LOW_LIMIT) / (max-LOW_LIMIT)));

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

  return (
    <>
        <BarChart chartData={chartData} />
        <PieChart chartData={chartData} />
    </>
  );
}
