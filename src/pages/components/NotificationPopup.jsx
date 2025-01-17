import React from "react";
import { FaCheck } from "react-icons/fa";

const NotificationPopup = ({ lowStockItems, setLowStockItems }) => {
  // Remove a single notification item and update LocalStorage
  const handleRemoveNotification = (indexToRemove) => {
    const updatedItems = lowStockItems.filter((_, index) => index !== indexToRemove);
    setLowStockItems(updatedItems);
    localStorage.setItem("lowStockItems", JSON.stringify(updatedItems)); // Update LocalStorage
  };

  return (
    <div className="absolute top-14 right-6 w-64 bg-white shadow-lg border border-gray-200 rounded-lg z-50">
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-red-500">Low Stock Warning</h3>
        {lowStockItems.length > 0 ? (
          lowStockItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <span className="font-thin">
                {item.name}: {item.numitems} remaining
              </span>
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => handleRemoveNotification(index)} // Remove specific item
              >
                <FaCheck />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No low stock items.</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
