import React from "react";
import { Chart, LineController, LinearScale, PointElement, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(LineController, LinearScale, PointElement, LineElement);

const LineChart = () => {
  // Sample data for the line chart
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales Data",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
