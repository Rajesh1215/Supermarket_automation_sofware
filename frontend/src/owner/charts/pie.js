import React from "react";
import { Chart, PieController, CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(PieController, CategoryScale);

const PieChart = () => {
  // Sample data for the pie chart
  const data = {
    labels: ["Category A", "Category B", "Category C", "Category D", "Category E"],
    datasets: [
      {
        data: [30, 20, 15, 25, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800"],
      },
    ],
  };

  // Chart options
  const options = {
    maintainAspectRatio: false,
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
