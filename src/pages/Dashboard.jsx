import React from "react";
import { Box, Card, Flex, Text, Avatar, Grid } from "@radix-ui/themes";
import Chart from "react-apexcharts";

const Dashboard = () => {
  // Placeholder data for cards
  const totalProducts = 150;
  const totalWholesalers = 25;

  // TreeMap chart options and data
  const treeMapOptions = {
    series: [
      {
        data: [
          { x: "Sari", y: 120 },
          { x: "Kurta", y: 90 },
          { x: "Shoes", y: 50 },
          { x: "Accessories", y: 70 },
          { x: "Shirts", y: 40 },
          { x: "Pants", y: 30 },
          { x: "Hats", y: 20 },
          { x: "Sweaters", y: 60 },
        ],
      },
    ],
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
            series={treeMapOptions.series}
            type="treemap"
            height={350}
          />
        </Card>
      </Box>
    </div>
  );
};

export default Dashboard;
