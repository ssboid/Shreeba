import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { fetchSales } from "../../services/salesApi";

const RevenueProfitChart = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const sales = await fetchSales();

        // Predefined order of months
        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        // Group sales by month
        const salesByMonth = sales.reduce((acc, sale) => {
          const saleDate = new Date(sale.sale_date);
          const month = saleDate.toLocaleString("default", { month: "short" }); // Get short month name

          if (!acc[month]) {
            acc[month] = { revenue: 0, profit: 0 };
          }

          // Calculate revenue and profit
          acc[month].revenue += sale.selling_price;
          acc[month].profit += sale.selling_price - (sale.marked_price || 0);

          return acc;
        }, {});

        // Ensure all months are included with default values
        const sortedMonths = monthOrder.map((month) => ({
          month,
          revenue: salesByMonth[month]?.revenue || 0,
          profit: salesByMonth[month]?.profit || 0,
        }));

        // Extract data for the chart
        const revenue = sortedMonths.map((entry) => entry.revenue);
        const profit = sortedMonths.map((entry) => entry.profit);
        const monthsArray = sortedMonths.map((entry) => entry.month);

        setMonths(monthsArray);
        setRevenueData(revenue);
        setProfitData(profit);

        console.log("Sorted Months:", sortedMonths); // Debugging the sorted data
      } catch (err) {
        console.error("Error fetching sales data:", err);
      }
    };

    fetchSalesData();
  }, []);

  const areaChartOptions = {
    chart: {
      type: "area",
      height: 350,
    },
    series: [
      {
        name: "Revenue",
        data: revenueData, // Use dynamic revenue data
      },
      {
        name: "Profit",
        data: profitData, // Use dynamic profit data
      },
    ],
    xaxis: {
      categories: months, // Dynamic months
    },
    stroke: {
      curve: "smooth", // Smooth curves for area chart
    },
    legend: {
      position: "top",
    },
    dataLabels: {
      enabled: false, // Hide data labels
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    colors: ["#4F46E5", "#2DD4BF"], // Custom colors
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.2,
      },
    },
  };

  return (
    <div>
      {/* <h2 className="text-lg font-semibold mb-4">Revenue and Profit Chart</h2> */}
      <Chart
        options={areaChartOptions}
        series={areaChartOptions.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default RevenueProfitChart;
