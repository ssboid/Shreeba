import { useState, useEffect } from "react";
import { getWholesalers, addWholesaler, deleteWholesaler, updateWholesaler } from "../services/wholesalersApi";
import { Table, Button } from "@radix-ui/themes";
import { showToast } from "../utils/toastUtils";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { getUsers, addUser, deleteUser, editUser } from "../services/adminApi";

const Accounts = () => {
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
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setWholesalerData(data); // Update this to `setUserData` if needed
        setFilteredData(data); // Initially, filteredData is the same as user data
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
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
      await addUser(formData.username, formData.password);
      const updatedUsers = await getUsers(); // Refetch all users
      setWholesalerData(updatedUsers);
      setFilteredData(updatedUsers);
  
      setFormData({ username: "", password: "" });
      setIsFormOpen(false);
      showToast("User added successfully!", "success");
    } catch (err) {
      console.error("Error adding user:", err);
      showToast("Failed to add user. Please try again.", "error");
    }
  };
  
  

  const handleUpdateWholesaler = async (id) => {
    try {
      await editUser(id, formData); // Use the API service to update user
      const updatedUsers = await getUsers(); // Refetch updated data
      setWholesalerData(updatedUsers);
      setFilteredData(updatedUsers);
      setIsFormOpen(false);
      setEditMode(false);
      setEditId(null);
      setFormData({ username: "", password: "", role: "" });
      showToast("User updated successfully!", "success");
    } catch (err) {
      console.error("Error updating user:", err);
      showToast("Failed to update user. Please try again.", "error");
    }
  };
  
  

  const handleEdit = (id) => {
    const selectedUser = wholesalerData.find((user) => user.id === id);
    if (selectedUser) {
      setFormData({
        username: selectedUser.username,
        password: "", // Leave password blank for editing
        role: selectedUser.role,
      });
      setEditMode(true);
      setEditId(id);
      setIsFormOpen(true); // Open modal in edit mode
    }
  };
  

  const openDeleteModal = (id) => {
    console.log("Deleting ID:", id); // Debug the ID being passed
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };
  

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    console.log("Confirm Delete ID:", deleteId); // Debug deleteId
    if (!deleteId) {
      showToast("No user ID specified for deletion.", "error");
      return;
    }
    try {
      const response = await deleteUser(deleteId);
  
      const updatedData = wholesalerData.filter((user) => user.id !== deleteId);
      setWholesalerData(updatedData);
      setFilteredData(updatedData);
  
      showToast(`User with ID: ${deleteId} deleted`, "success");
      closeDeleteModal();
    } catch (err) {
      showToast(`Failed to delete user with ID: ${deleteId}`, "error");
      console.error("Error deleting user:", err);
    }
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
          Accounts
        </h1>
        <div className="flex items-center justify-between">
          <button
            onClick={openAddWholesalerModal}
            className="border border-primaryOrange text-primaryOrange hover:bg-primaryOrange hover:text-white font-medium rounded-full px-4 py-2 transition-colors duration-150"
          >
            Add Account
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

    {/* Add/Edit Account Form */}
{/* Add/Edit Account Form */}
{isFormOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-40 bg-opacity-50">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
          showToast("All fields are required!", "error");
          return;
        }
        if (editMode) {
          handleUpdateWholesaler(editId); // Update logic if required
        } else {
          handleAddWholesaler(e); // Add logic if required
        }
      }}
      className="bg-white p-6 rounded-md shadow-md space-y-4 w-1/3"
    >
      <h2 className="text-lg font-semibold">
        {editMode ? "Edit Account" : "Add Account"}
      </h2>
      <div>
        <label className="block font-medium mb-1">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Enter username"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Enter password"
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
          className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          {editMode ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  </div>
)}



  {/* Paginated Table for Users */}
<Table.Root
  variant="surface"
  className="w-full border border-gray-300 rounded-md shadow-md"
>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeaderCell>S.N</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
  {currentPageData.map((user, index) => (
    <Table.Row key={user.id}>
      <Table.RowHeaderCell>
        {(currentPage - 1) * rowsPerPage + index + 1}
      </Table.RowHeaderCell>
      <Table.Cell>{user.username}</Table.Cell>
      <Table.Cell>{user.role}</Table.Cell>
      <Table.Cell>
        <div className="relative">
          <button
            className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 shadow-md"
            onClick={() => toggleActionMenu(user.id)}
          >
            ...
          </button>
          {activeActionId === user.id && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-50 flex flex-col">
              {/* Edit button */}
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-100 text-blue-600 font-medium border-b border-gray-200"
                onClick={() => handleEdit(user.id)}
              >
                Edit
              </button>

              {/* Conditionally render Delete button */}
              {user.role !== "admin" && (
                <button
                  className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 font-medium"
                  onClick={() => openDeleteModal(user.id)}
                >
                  Delete
                </button>
              )}
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

export default Accounts;
