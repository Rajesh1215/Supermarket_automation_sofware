import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const DoughnutChart = () => {
  const data = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: true,
    // Add any other options you need
  };
  

  return <Doughnut data={data} options={chartOptions} />;
};

export default DoughnutChart;
