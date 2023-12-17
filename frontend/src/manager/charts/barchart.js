import React from "react";
import { Chart, LinearScale, CategoryScale, BarElement, BarController } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(LinearScale, CategoryScale, BarElement, BarController);

const BarChart = ({ labels, data }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Data",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: data,
      },
    ],
  };
  // const maxDataValue = Math.max(...data);
  // const maxAxisValue = Math.ceil(maxDataValue / 5) * 5;


  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        // max: maxAxisValue,
        ticks: {
          stepSize: 1,

        },
      },
    },
    
    plugins: {
      legend: {
        display: false, // Remove the legend
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};


export const Histogram = ({ data, binCount }) => {
  const histogramData = [];

  // Calculate the histogram data
  for (let i = 0; i < binCount; i++) {
    const lowerBound = i * (100 / binCount);
    const upperBound = (i + 1) * (100 / binCount);
    const count = data.filter(value => value >= lowerBound && value < upperBound).length;
    histogramData.push(count);
  }

  const chartData = {
    labels: histogramData.map((_, index) => `${Math.floor((index * 100) / binCount)}-${Math.floor(((index + 1) * 100) / binCount)}`),
    datasets: [
      {
        label: "Histogram",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: histogramData,
      },
    ],
  };

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
    plugins: {
      legend: {
        display: false, // Remove the legend
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};


export default BarChart;
