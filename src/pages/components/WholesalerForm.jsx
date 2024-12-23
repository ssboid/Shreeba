import React, { useState, useEffect } from 'react';
import { addWholesaler } from '../../services/wholesalersApi';


const WholesalerDialog = ({ onAddWholesaler }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    contact: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWholesaler = await addWholesaler(formData);
      onAddWholesaler(newWholesaler); // Notify parent to update the list
      setFormData({ name: '', code: '', contact: '' }); // Reset form
      setIsDialogOpen(false); // Close dialog
      
    } catch (error) {
      console.error('Error adding wholesaler:', error);
    }
  };

  return (
    <>
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => setIsDialogOpen(true)}
      >
        Add Wholesaler
      </button>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md space-y-4 w-1/3">
            <h2 className="text-lg font-semibold">Add Wholesaler</h2>
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Enter contact"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default WholesalerDialog;

