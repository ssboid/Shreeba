import { useState, useEffect } from "react";
import { getWholesalers, addWholesaler } from "../services/wholesalersApi";
import { Table, Button } from "@radix-ui/themes";
import { showToast } from "../utils/toastUtils";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const Wholesalers = () => {
  const [wholesalerData, setWholesalerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", code: "", contact: "" });
  const [activeActionId, setActiveActionId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Filter state
  const [sortField, setSortField] = useState("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  useEffect(() => {
    const fetchWholesalers = async () => {
      try {
        setLoading(true);
        const data = await getWholesalers();
        setWholesalerData(data);
        setFilteredData(data); // Initially, filteredData is the same as wholesalerData
      } catch (err) {
        console.error("Error fetching wholesalers:", err);
        setError("Failed to load wholesalers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWholesalers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openAddWholesalerModal = () => {
    setFormData({ name: "", code: "", contact: "" }); // Reset form
    setEditMode(false); // Ensure it's in add mode
    setIsFormOpen(true); // Open modal
  };

  const handleAddWholesaler = async (e) => {
    e.preventDefault();
    try {
      const newWholesaler = await addWholesaler(formData);
      setWholesalerData((prevData) => [...prevData, newWholesaler]);
      setFilteredData((prevData) => [...prevData, newWholesaler]); // Update filtered data
      setFormData({ name: "", code: "", contact: "" });
      setIsFormOpen(false);
      showToast("Wholesaler added successfully!", "success");
    } catch (err) {
      console.error("Error adding wholesaler:", err);
      showToast("Failed to add wholesaler. Please try again.", "error");
    }
  };

  const handleUpdateWholesaler = (id) => {
    const updatedData = wholesalerData.map((wholesaler) =>
      wholesaler.id === id ? { ...wholesaler, ...formData } : wholesaler
    );
    setWholesalerData(updatedData);
    setFilteredData(updatedData); // Update filtered data
    setIsFormOpen(false);
    setEditMode(false);
    setEditId(null);
    setFormData({ name: "", code: "", contact: "" });
    showToast("Wholesaler updated successfully!", "success");
  };

  const handleEdit = (id) => {
    const selectedWholesaler = wholesalerData.find(
      (wholesaler) => wholesaler.id === id
    );
    if (selectedWholesaler) {
      setFormData({
        name: selectedWholesaler.name,
        code: selectedWholesaler.code,
        contact: selectedWholesaler.contact,
      });
      setEditMode(true);
      setEditId(id);
      setIsFormOpen(true); // Open modal in edit mode
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const confirmDelete = () => {
    const updatedData = wholesalerData.filter(
      (wholesaler) => wholesaler.id !== deleteId
    );
    setWholesalerData(updatedData);
    setFilteredData(updatedData);
    showToast(`Wholesaler with ID: ${deleteId} deleted`, "success");
    closeDeleteModal();
  };

  const toggleActionMenu = (id) => {
    setActiveActionId((prev) => (prev === id ? null : id));
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc"; // Toggle order
    setSortField(field);
    setSortOrder(order);

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(wholesalerData); // Reset to full data when search query is empty
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = wholesalerData.filter(
        (wholesaler) =>
          wholesaler.name.toLowerCase().includes(lowerCaseQuery) ||
          wholesaler.code.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    }
  };

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
        {/* Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-md space-y-4 w-1/3">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Deletion
              </h2>
              <p className="text-gray-600">
                Are you sure you want to delete this wholesaler? This action
                cannot be undone.
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={confirmDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        <h1 className="text-2xl mb-4 text-primary1000 font-bold">
          Wholesalers
        </h1>
        <div className="flex items-center justify-between">
          <button
            onClick={openAddWholesalerModal}
            className="border border-primaryOrange text-primaryOrange hover:bg-primaryOrange hover:text-white font-medium rounded-full px-4 py-2 transition-colors duration-150"
          >
            Add Wholesaler
          </button>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by Name or Code..."
              className="p-2 border rounded-md w-[220px]"
            />
            <label className="ml-2 mr-2 font-medium">Sort by:</label>
            <select
              value={sortField}
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 mr-4 border rounded-md"
            >
              <option value="name">Name</option>
              <option value="code">Code</option>
            </select>
            <button
              className="border border-primaryOrange text-primaryOrange hover:bg-primaryOrange hover:text-white font-medium rounded-full px-4 py-2 transition-colors duration-150"
              onClick={() => handleSort(sortField)}
            >
              {sortOrder === "asc" ? (
                <AiOutlineSortDescending className="w-8 h-6" />
              ) : (
                <AiOutlineSortAscending className="w-8 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Wholesaler Form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-40 bg-opacity-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!formData.name || !formData.code || !formData.contact) {
                showToast("All fields are required!", "error");
                return;
              }
              if (!/^\d{10}$/.test(formData.contact)) {
                showToast("Contact must be a 10-digit number!", "error");
                return;
              }
              if (editMode) {
                handleUpdateWholesaler(editId);
              } else {
                handleAddWholesaler(e);
              }
            }}
            className="bg-white p-6 rounded-md shadow-md space-y-4 w-1/3"
          >
            <h2 className="text-lg font-semibold">
              {editMode ? "Edit Wholesaler" : "Add Wholesaler"}
            </h2>
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Code</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Enter code"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setFormData({ ...formData, contact: e.target.value });
                  }
                }}
                maxLength={10}
                placeholder="Enter 10-digit contact"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditMode(false);
                  setEditId(null);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                {editMode ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Paginated Table */}
      <Table.Root
        variant="surface"
        className="w-full border border-gray-300 rounded-md shadow-md"
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.N</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Code</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Contact</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentPageData.map((wholesaler, index) => (
            <Table.Row key={wholesaler.id}>
              <Table.RowHeaderCell>
                {(currentPage - 1) * rowsPerPage + index + 1}
              </Table.RowHeaderCell>
              <Table.Cell>{wholesaler.name}</Table.Cell>
              <Table.Cell>{wholesaler.code}</Table.Cell>
              <Table.Cell>{wholesaler.contact}</Table.Cell>
              <Table.Cell>
                <div className="relative">
                  <button
                    className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 shadow-md"
                    onClick={() => toggleActionMenu(wholesaler.id)}
                  >
                    ...
                  </button>
                  {activeActionId === wholesaler.id && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50 flex flex-col">
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-600 font-medium border-b border-gray-200"
                        onClick={() => handleEdit(wholesaler.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-medium"
                        onClick={() => openDeleteModal(wholesaler.id)}
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

export default Wholesalers;
