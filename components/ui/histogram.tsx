import React, { useRef, useEffect } from "react";
import { Chart, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, BarElement, Title);

export const Histogram = ({ data }: { data: number[] }) => {
  const chartRef = useRef(null);

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
    elements: {
      bar: {
        backgroundColor: (context: any) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
          return gradient;
        },
        borderRadius: 10,
      },
    },
  };

  const labels = Array.from({ length: data.length }, (_, i) => i + 1);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Histogram",
        data,
      },
    ],
  };

  return (
    <div className="bg-black bg-opacity-50 p-4 rounded-lg">
      <Bar ref={chartRef} options={options} data={chartData} />
    </div>
  );
};
