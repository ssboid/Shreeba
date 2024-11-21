import React from "react";
import { FaTh, FaShoppingBag, FaUsers, FaChartLine, FaInfoCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sticky w-64 rounded-2xl bg-secondary100 shadow-2xl flex flex-col p-4 space-y-4">
      <ul className="space-y-2">
        <li className="flex items-center space-x-3 p-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">
          <FaTh />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-100">
          <FaShoppingBag className="text-orange-600" />
          <span>Goods</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-100">
          <FaUsers className="text-orange-600" />
          <span>Wholesalers</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-100">
          <FaChartLine className="text-orange-600" />
          <span>Sales</span>
        </li>
        <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-100">
          <FaInfoCircle className="text-orange-600" />
          <span>Help</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
