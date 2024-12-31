import React from 'react';
import Chart from 'react-apexcharts';

const Sales = () => {
  const areaChartOptions = {
    chart: {
      type: 'area',
      height: 350,
    },
    series: [
      {
        name: 'Product A',
        data: [45, 52, 38, 45, 19, 23, 50], // Example sales data for Product A
      },
      {
        name: 'Product B',
        data: [35, 41, 62, 35, 30, 50, 45], // Example sales data for Product B
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis categories (Months)
    },
    stroke: {
      curve: 'smooth', // Smooth curves for area chart
    },
    legend: {
      position: 'top',
    },
    dataLabels: {
      enabled: false, // Hide data labels
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    colors: ['#4F46E5', '#2DD4BF'], // Custom colors
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.2,
      },
    },
  };

  const barChartOptions = {
    chart: {
      type: 'bar',
      stacked: false,
      height: 350,
    },
    series: [
      {
        name: 'Online Sales',
        data: [400, 500, 600, 700, 800, 850, 900], // Example sales data for Online
      },
      {
        name: 'Offline Sales',
        data: [300, 450, 500, 550, 600, 650, 700], // Example sales data for Offline
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // X-axis categories (Months)
    },
    colors: ['#FF5733', '#33C3FF'], // Custom colors for bar chart
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    legend: {
      position: 'top',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 4,
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Area Chart */}
        <div className="card p-4 shadow rounded-md">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <Chart
            options={areaChartOptions}
            series={areaChartOptions.series}
            type="area"
            height={350}
          />
        </div>

        {/* Bar Chart */}
        <div className="card p-4 shadow rounded-md">
          <h2 className="text-lg font-semibold mb-4">Online vs Offline Sales</h2>
          <Chart
            options={barChartOptions}
            series={barChartOptions.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Sales;
