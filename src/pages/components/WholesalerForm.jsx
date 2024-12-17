import React, { useState } from 'react';

const WholesalerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Wholesaler Data:', formData);
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <button
        type="submit"
        className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Submit
      </button>
    </form>
  );
};

export default WholesalerForm;
