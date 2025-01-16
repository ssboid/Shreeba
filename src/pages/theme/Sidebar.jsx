import React from "react";
import { FaTh, FaShoppingBag, FaUsers, FaChartLine, FaInfoCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: FaTh, path: "/dashboard" },
    { name: "Goods", icon: FaShoppingBag, path: "/goods" },
    { name: "Wholesalers", icon: FaUsers, path: "/wholesalers" },
    { name: "Sales", icon: FaChartLine, path: "/sales" },
    { name: "Help", icon: FaInfoCircle, path: "/help" },
  ];

  return (
    <div className="sticky w-64 rounded-2xl sticky top-24 bg-white shadow-2xl flex flex-col p-4 space-y-4">
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer 
                ${isActive ? "bg-orange-500 text-white" : "hover:bg-orange-100 text-orange-600"}`}
            >
              <item.icon className={isActive ? "text-white" : "text-orange-600"} />
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
