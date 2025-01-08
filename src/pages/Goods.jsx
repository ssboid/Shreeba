import { useState, useEffect } from "react";
import { Table } from "@radix-ui/themes";
import { Grid, List } from "lucide-react";
import image from "../assets/brand/Cover.png";
import AddDialog from "./components/AddDialog";
import { getGoods } from "../services/goodsApi";
import { showToast } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
const Goods = () => {
  const navigate = useNavigate();
  const [isGridView, setIsGridView] = useState(true);
  const [goodsData, setGoodsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [filters, setFilters] = useState({ wholesaler: "", year: "" });
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeActionId, setActiveActionId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const handleNavigateToDetails = (id) => {
    navigate(`/product-details/${id}`);
  };
  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const data = await getGoods();
        setGoodsData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };

    fetchGoods();
  }, []);

  const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
          <p className="mb-6">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  const handleDelete = () => {
    const updatedData = goodsData.filter((item) => item.id !== itemToDelete);
    setGoodsData(updatedData);
    setFilteredData(updatedData);
    setIsDeleteModalOpen(false);
    showToast("Item deleted successfully!", "success");
  };
  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const currentPageData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  const handleSortChange = () => {
    const sorted = [...filteredData].sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.purchasedate) - new Date(a.purchasedate);
      }
      return new Date(a.purchasedate) - new Date(b.purchasedate);
    });
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
    setFilteredData(sorted);
  };

  useEffect(() => {
    const applyFilters = () => {
      const filtered = goodsData.filter(
        (item) =>
          (!filters.wholesaler || item.wholesalername === filters.wholesaler) &&
          (!filters.year ||
            new Date(item.purchasedate).getFullYear().toString() ===
              filters.year)
      );
      setFilteredData(filtered);
    };
    applyFilters();
  }, [filters, goodsData]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const toggleActionMenu = (id) => {
    setActiveActionId((prev) => (prev === id ? null : id));
  };

  const sections = [
    {
      title: "General Information",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter item name",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Enter description",
        },
      ],
    },
    {
      title: "Wholesaler & Pricing",
      fields: [
        {
          name: "costPrice",
          label: "Cost Price",
          type: "number",
          placeholder: "Enter cost price",
          required: true,
        },
        {
          name: "markedPrice",
          label: "Marked Price",
          type: "number",
          placeholder: "Enter marked price",
          required: true,
        },
      ],
    },
    {
      title: "Variants",
      fields: [
        {
          name: "color",
          label: "Color",
          type: "text",
          placeholder: "Enter color",
        },
        {
          name: "size",
          label: "Size",
          type: "text",
          placeholder: "Enter size",
        },
      ],
    },
  ];

  return (
    <div className="2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-primary1000 font-bold">Goods Inventory</h1>
      </div>

      

      <div className="flex py-4 justify-between">
      <AddDialog sections={sections} />
        <div className="flex items-center gap-4">
          <button
            className="py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={handleSortChange}
          >
            Sort by {sortOrder === "newest" ? "Newest" : "Oldest"}
          </button>
          <select
            className="py-2 px-4 border rounded-md"
            onChange={(e) => handleFilterChange("wholesaler", e.target.value)}
          >
            <option value="">All Wholesalers</option>
            {[...new Set(goodsData.map((item) => item.wholesalername))].map(
              (wholesaler) => (
                <option key={wholesaler} value={wholesaler}>
                  {wholesaler}
                </option>
              )
            )}
          </select>
          <select
            className="py-2 px-4 border rounded-md"
            onChange={(e) => handleFilterChange("year", e.target.value)}
          >
            <option value="">All Years</option>
            {[
              ...new Set(
                goodsData.map((item) =>
                  new Date(item.purchasedate).getFullYear().toString()
                )
              ),
            ].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            className="flex items-center gap-2 py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setIsGridView((prev) => !prev)}
          >
            {isGridView ? (
              <List className="w-5 h-5" />
            ) : (
              <Grid className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {isGridView ? (
        <div className="grid md:grid-cols-3 gap-4">
          {currentPageData.map((item, index) => (
            <div
              key={index}
              className="border rounded-md bg-white p-4 shadow cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleNavigateToDetails(item.id)}
            >
              <img
                src={item.productimage || image}
                alt={item.name}
                className="w-full h-80 object-cover rounded-md mb-2"
              />
              <h1 className="font-semibold text-lg">{item.name}</h1>
              <h2 className="font-semibold text-md">{item.productcode}</h2>
              <p className="text-gray-500">Marked Price: ${item.markedprice}</p>
              <p className="text-gray-500">
                Wholesaler Name: {item.wholesalername}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <Table.Root
          variant="surface"
          className="w-full border border-gray-300 rounded-md shadow-md"
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>S.N</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Piece Code</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Piece Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Purchase Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Cost Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Marked Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Available</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentPageData.map((item, index) => (
              <Table.Row key={index}>
                <Table.RowHeaderCell>{index + 1}</Table.RowHeaderCell>
                <Table.Cell>{item.productcode}</Table.Cell>
                <Table.Cell>
                  <span
                    className="cursor-pointer hover:text-primaryOrange"
                    onClick={() => handleNavigateToDetails(item.id)}
                  >
                    {item.name}
                  </span>
                </Table.Cell>{" "}
                <Table.Cell>{item.purchasedate}</Table.Cell>
                <Table.Cell>{item.costprice}</Table.Cell>
                <Table.Cell>{item.markedprice}</Table.Cell>
                <Table.Cell>{item.pieceavailable ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>
                  <div className="relative">
                    <button
                      className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 shadow-md"
                      onClick={() => toggleActionMenu(item.id)}
                    >
                      ...
                    </button>
                    {activeActionId === item.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                        <button className="w-full px-4 py-2 text-left hover:bg-blue-100 text-blue-600">
                          Edit
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400"
              : "bg-blue-500 text-white hover:bg-blue-600"
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
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Goods;
