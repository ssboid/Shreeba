import React from "react";
import { FaTh, FaShoppingBag, FaUsers, FaChartLine, FaInfoCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTh className="text-orange-600" />, path: "/dashboard" },
    { name: "Goods", icon: <FaShoppingBag className="text-orange-600" />, path: "/goods" },
    { name: "Wholesalers", icon: <FaUsers className="text-orange-600" />, path: "/wholesalers" },
    { name: "Sales", icon: <FaChartLine className="text-orange-600" />, path: "/sales" },
    { name: "Help", icon: <FaInfoCircle className="text-orange-600" />, path: "/help" },
  ];

  return (
    <div className="sticky w-64 rounded-2xl bg-white shadow-2xl flex flex-col p-4 space-y-4">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer 
              ${location.pathname === item.path ? "bg-orange-500 text-white" : "hover:bg-orange-100"}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
