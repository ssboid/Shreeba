import { useState, useEffect } from "react";
import { fetchSales } from "../services/salesApi";
import { Table } from "@radix-ui/themes";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const data = await fetchSales();
        console.log("Fetched sales data:", data); // Log fetched data for debugging
        setSalesData(data);
      } catch (err) {
        console.error("Error fetching sales:", err);
        setError("Failed to load sales. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(salesData.length / rowsPerPage);
  const currentPageData = salesData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate Total Revenue
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.selling_price, 0);

  // Calculate Total Profit
  const totalProfit = salesData
    .map((sale) => sale.selling_price - (sale.marked_price || 0)) // Map profits
    .filter((profit) => !isNaN(profit)) // Exclude invalid profits
    .reduce((sum, profit) => sum + profit, 0); // Sum valid profits

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl mb-4 text-primary1000 font-bold">Admin Sales</h1>
      </div>
      {/* Paginated Table */}
      <Table.Root
        variant="surface"
        className="w-full border border-gray-300 rounded-md shadow-md"
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.N</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Product Code</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>S.P</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>M.P</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Profit</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentPageData.map((sale, index) => {
            const profit = sale.selling_price - (sale.marked_price || 0); // Calculate profit
            return (
              <Table.Row key={sale.sale_id}>
                <Table.RowHeaderCell>
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </Table.RowHeaderCell>
                <Table.Cell>{sale.goods_name || "N/A"}</Table.Cell> {/* Name */}
                <Table.Cell>{sale.productcode || "N/A"}</Table.Cell> {/* Product Code */}
                <Table.Cell>Rs. {sale.selling_price}</Table.Cell> {/* Selling Price */}
                <Table.Cell>Rs. {sale.marked_price || "N/A"}</Table.Cell> {/* Marked Price */}
                <Table.Cell>Rs. {!isNaN(profit) ? profit : "N/A"}</Table.Cell> {/* Profit */}
                <Table.Cell>{sale.sale_date.split("T")[0]}</Table.Cell> {/* Date */}
              </Table.Row>
            );
          })}
          {/* Total Revenue and Profit Row */}
          <Table.Row>
            <Table.RowHeaderCell colSpan={3} className="font-bold text-right">
              Total
            </Table.RowHeaderCell>
            <Table.Cell className="font-bold">{totalRevenue}</Table.Cell> {/* Total Revenue */}
            <Table.Cell></Table.Cell>
            <Table.Cell className="font-bold">{totalProfit}</Table.Cell> {/* Total Profit */}
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Sales;
