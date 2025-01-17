import { useState, useEffect } from "react";
import React from "react";
import { Box, Card, Flex, Text, Avatar, Grid, Tooltip } from "@radix-ui/themes";
import Chart from "react-apexcharts";
import { getGoods } from "../services/goodsApi";
import { getWholesalers } from "../services/wholesalersApi";
import RevenueProfitChart from "./components/RevenueProfitChart";

const Dashboard = () => {
  const [treeMapSeries, setTreeMapSeries] = useState([]); // State for treemap data

  const [totalProducts, setTotalProducts] = useState(0); // State for total products
  const [totalWholesalers, setTotalWholesalers] = useState(0); // State for total wholesalers
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch goods and wholesalers data
        const [goodsData, wholesalersData] = await Promise.all([getGoods(), getWholesalers()]);

        // Update state with total counts
        setTotalProducts(goodsData.length);
        setTotalWholesalers(wholesalersData.length);
      } catch (err) {
        console.error("Error fetching data for dashboard:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchGoodsData = async () => {
      try {
        setLoading(true);

        // Fetch goods data
        const goodsData = await getGoods();
        console.log("Fetched goods data:", goodsData);

        // Map data to TreeMap format
        const formattedData = goodsData.map((item) => ({
          x: item.name, // Name of the product
          y: parseInt(item.numitems, 10), // Frequency of the product
        }));

        setTreeMapSeries([{ data: formattedData }]); // Set series for the chart
      } catch (err) {
        console.error("Error fetching goods data:", err);
        setError("Failed to load product data for TreeMap.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoodsData();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div className="text-red-500">{error}</div>; // Error state
  }
  // TreeMap chart options and data
// TreeMap chart options
const treeMapOptions = {
  chart: {
    type: "treemap",
    height: 350,
  },
  title: {
    text: "Product Frequency Distribution",
    align: "center",
    style: { fontSize: "16px", fontWeight: "bold" },
  },
  legend: {
    show: false,
  },
  colors: ["#B59F78", "#F96E2A", "#EF4444", "#22D3EE", "#FC8F54"], // Tailwind CSS colors
  plotOptions: {
    treemap: {
      distributed: true, // Distribute each value as a separate color
      enableShades: true,
    },
  },
};
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
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Dashboard Cards */}
      <Grid columns={{ xs: "1", sm: "2" }} gap="4" className="mb-6">
        {/* Total Products Card */}
        <Box>
          <Card>
            <Flex gap="4" align="center">
              <Avatar
                size="3"
                src="https://images.unsplash.com/photo-1581091870635-8b8c9f8a7d4b?&w=64&h=64&dpr=2&q=70&fit=crop"
                radius="full"
                fallback="P"
              />
              <Box>
                <Text as="div" size="4" weight="bold">
                  Total Products
                </Text>
                <Text as="div" size="3" color="gray">
                  {totalProducts} items
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>

        {/* Total Wholesalers Card */}
        <Box>
          <Card>
            <Flex gap="4" align="center">
              <Avatar
                size="3"
                src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?&w=64&h=64&dpr=2&q=70&fit=crop"
                radius="full"
                fallback="W"
              />
              <Box>
                <Text as="div" size="4" weight="bold">
                  Total Wholesalers
                </Text>
                <Text as="div" size="3" color="gray">
                  {totalWholesalers} partners
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
      </Grid>

      {/* TreeMap Chart */}
      <Box>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Product Frequency</h2>
          <Chart
            options={treeMapOptions}
            series={treeMapSeries}
            type="treemap"
            height={350}
          />
        </Card>
      </Box>


       <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-4">
              {/* Area Chart */}
              <div className="card p-4 shadow rounded-md">
          <h2 className="text-lg font-semibold mb-4">Revenue and Profit</h2>
          <RevenueProfitChart /> {/* Include the RevenueProfitChart */}
        </div>
      </div>
      
              {/* Bar Chart */}
              {/* <div className="card p-4 shadow rounded-md">
                <h2 className="text-lg font-semibold mb-4">Online vs Offline Sales</h2>
                <Chart
                  options={barChartOptions}
                  series={barChartOptions.series}
                  type="bar"
                  height={350}
                />
              </div> */}
            </div>
  );
};

export default Dashboard;
