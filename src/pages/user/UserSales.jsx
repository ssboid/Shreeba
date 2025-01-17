import { useState, useEffect } from "react";
import NepaliDate from "nepali-date"; // Import NepaliDate library
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

  // Get today's Nepali date in YYYY-MM-DD format
  const getTodayNepaliDate = () => {
    const nepaliToday = new NepaliDate(); // Get today's Nepali date
    const year = nepaliToday.getYear();
    const month = String(nepaliToday.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(nepaliToday.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };

  // Adjust a Nepali date by adding 1 day
  const adjustNepaliDate = (dateString) => {
    if (!dateString) return "N/A";
    const nepaliDate = new NepaliDate(dateString); // Convert ISO date to Nepali date
    nepaliDate.setDate(nepaliDate.getDate() + 1); // Add 1 day
    const year = nepaliDate.getYear();
    const month = String(nepaliDate.getMonth() + 1).padStart(2, "0");
    const day = String(nepaliDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Return adjusted date as YYYY-MM-DD
  };

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);

        // Fetch sales from the API
        const data = await fetchSales();
        console.log("Fetched sales data:", data);

        // Get today's Nepali date for filtering
        const nepaliToday = getTodayNepaliDate();
        console.log("Today's Nepali date:", nepaliToday);

        // Filter sales for today's Nepali date
        const todaysSales = data.filter((sale) => {
          const adjustedDate = adjustNepaliDate(sale.sale_date); // Adjust the date
          console.log("Adjusted Nepali date for sale:", adjustedDate);
          return adjustedDate === nepaliToday; // Compare with today's Nepali date
        });

        console.log("Today's sales data:", todaysSales);

        setSalesData(todaysSales);
        setFilteredData(todaysSales); // Set filtered data as today's sales
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
    <div>
      <h1 className="text-2xl mb-4 text-primary1000 font-bold">Today's Sales</h1>
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
              <Table.Cell>{adjustNepaliDate(sale.sale_date)}</Table.Cell> {/* Adjusted Date */}
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
