import React from "react";
import { Chart, LineController, LinearScale, PointElement, LineElement,TimeScale, Title,Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';

Chart.register(LineController, LinearScale, PointElement, LineElement,TimeScale, Title,Legend);

function LineChart({ data }) {
  console.log('hi',data);
  // Check if data is null or empty
  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: data.map((entry) => entry.month_year),
    datasets: [
      {
        label: "Total Revenue",
        data: data.map((entry) => ({ x: entry.month_year, y: entry.total_revenue })),
        fill: false,
        borderColor: "rgba(0,255,0,1)",
        tension: 0.1,
      },
      {
        label: "Total Expense",
        data: data.map((entry) => ({ x: entry.month_year, y: entry.total_expense })),
        fill: false,
        borderColor: "rgba(255,0,0,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy',
          },
        },
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top', // You can change the legend position: 'top', 'bottom', 'left', 'right'

      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export function ExpenseLinechart({ data }) {
  // Check if data is null or empty
  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  const chartData = {
    labels: data.map((entry) => entry.month_year),
    datasets: [
      {
        label: "Stock Expense",
        data: data.map((entry) => ({ x: entry.month_year, y: entry.total_stock_expense })),
        fill: false,
        borderColor: "rgba(192, 118, 249,1)",
        tension: 0.1,
      },
      {
        label: "Other Expense",
        data: data.map((entry) => ({ x: entry.month_year, y: entry.total_other_expense })),
        fill: false,
        borderColor: "rgba(133, 118, 249,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM yyyy',
          },
        },
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top', // You can change the legend position: 'top', 'bottom', 'left', 'right'

      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;
