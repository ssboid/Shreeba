import { useState, useEffect } from "react";
import React from "react";
import { Box, Card, Flex, Text, Avatar, Grid, Tooltip } from "@radix-ui/themes";
import Chart from "react-apexcharts";

const UserDashboard = () => {
  const [treeMapSeries, setTreeMapSeries] = useState([]); // State for treemap data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for errors

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* TreeMap Chart */}
      <Box>
        <Card>
          <h2 className="text-lg font-semibold mb-4">Product Frequency</h2>
          <Chart
            options={treeMapOptions}
            series={treeMapOptions.series}
            type="treemap"
            height={350}
          />
        </Card>
      </Box>
    </div>
  );
};

export default UserDashboard;
