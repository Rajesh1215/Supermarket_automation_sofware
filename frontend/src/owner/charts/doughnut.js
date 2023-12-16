import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend } from 'chart.js';

// Register the legend plugin
Chart.register(ArcElement, Legend);

const DoughnutChart = ({ categorySalesData }) => {
  // Check if categorySalesData is undefined or null
  if (!categorySalesData || !categorySalesData.length) {
    return <div>No data available</div>;
  }

  // Extracting labels and data from props
  const labels = categorySalesData.map(
    (item) => `${item.categoryName}`
  );
  const data = categorySalesData.map((item) => item.total_sales_by_cat);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom', // You can use 'left' if you prefer the legend on the left side
      },
    },
    // Override for doughnut chart legend options
    overrides: {
      doughnut: {
        plugins: {
          legend: {
            position: 'bottom', // Adjust the position as needed
          },
        },
      },
    },
    // Add any other options you need
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};

 
export const DoughnutChartProCatogary = ({ itemsByCategory }) => {
  // Check if itemsByCategory is undefined or null
  if (!itemsByCategory || !itemsByCategory.length) {
    return <div>No data available</div>;
  }

  // Extracting labels and data from props
  const labels = itemsByCategory.map(
    (item) => `${item.product__product_category__name}`
  );
  const data = itemsByCategory.map((item) => item.item_count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    aspectRatio: 1,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};



export default DoughnutChart;
