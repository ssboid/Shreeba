import { useState, useEffect } from "react";
import { fetchSales } from "../../services/salesApi";
import { Table } from "@radix-ui/themes";

const UserSales = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Helper function to format the date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString.split("T")[0]; // Split on 'T' and take the first part
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const data = await fetchSales();
        setSalesData(data);
        setFilteredData(data); // Initially, filteredData is the same as salesData
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
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentPageData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
    <div className="">
      <div className="mb-4">
        <h1 className="text-2xl mb-4 text-primary1000 font-bold">Sales</h1>
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
            <Table.ColumnHeaderCell>S.P</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>M.P</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Remarks</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentPageData.map((sale, index) => (
            <Table.Row key={sale.sale_id}>
              <Table.RowHeaderCell>
                {(currentPage - 1) * rowsPerPage + index + 1}
              </Table.RowHeaderCell>
              <Table.Cell>{sale.goods_name || "N/A"}</Table.Cell> {/* Name */}
              <Table.Cell>{sale.selling_price}</Table.Cell> {/* Selling Price */}
              <Table.Cell>{sale.marked_price || "N/A"}</Table.Cell> {/* Marked Price */}
              <Table.Cell>{formatDate(sale.sale_date)}</Table.Cell> {/* Formatted Date */}
              <Table.Cell>{sale.remarks || "No Remarks"}</Table.Cell> {/* Remarks */}
            </Table.Row>
          ))}
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

export default UserSales;
