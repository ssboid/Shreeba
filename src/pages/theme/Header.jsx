import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaBell } from "react-icons/fa";
import { HiMenu } from "react-icons/hi"; // Hamburger Icon
import { FaTh, FaShoppingBag, FaChartLine, FaInfoCircle } from "react-icons/fa"; // Icons for user menu items
import Cookies from "js-cookie";
import HeaderLogo from "../../assets/brand/header-logo.png";
import { getGoods } from "../../services/goodsApi";
import NotificationPopup from "../components/NotificationPopup";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu toggle
  const [userRole, setUserRole] = useState(""); // State for user role
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [lowStockItems, setLowStockItems] = useState([]); // State for low stock items
  const [showNotification, setShowNotification] = useState(false); // State to toggle notification popup

  const userMenuItems = [
    { name: "Dashboard", icon: FaTh, path: "/user" },
    { name: "Goods", icon: FaShoppingBag, path: "/user-goods" },
    { name: "Sales", icon: FaChartLine, path: "/user-sales" },
    { name: "Help", icon: FaInfoCircle, path: "/user-help" },
  ];

  // Check cookie on component mount
  useEffect(() => {
    const loginStatus = Cookies.get("isLogin") === "true";
    const role = Cookies.get("role"); // Get the role from cookies
    setIsLoggedIn(loginStatus);
    setUserRole(role); // Set the user role
  }, []);

  // Fetch low stock items
  useEffect(() => {
    const fetchLowStockItems = async () => {
      try {
        const goodsData = await getGoods();
        const lowStock = goodsData.filter(
          (item) => parseInt(item.numitems, 10) <= 50
        );

        const storedLowStockItems =
          JSON.parse(localStorage.getItem("lowStockItems")) || [];
        const updatedLowStock = storedLowStockItems.length
          ? storedLowStockItems
          : lowStock;

        setLowStockItems(updatedLowStock);

        if (!storedLowStockItems.length) {
          localStorage.setItem("lowStockItems", JSON.stringify(lowStock));
        }
      } catch (err) {
        console.error("Error fetching goods:", err);
      }
    };

    fetchLowStockItems();
  }, []);

  // Handle logout
  const logout = () => {
    Cookies.remove("isLogin");
    Cookies.remove("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Handle scroll direction
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return (
    <header
      className={`flex items-center sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      } justify-between bg-white py-4 px-6 lg:px-[8.33%] text-black border-b border-gray-200 relative transition-all duration-500 z-50`}
    >
      {/* Logo and Hamburger Menu */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={HeaderLogo}
            alt="Shreeba Collection Logo"
            className="h-12 w-auto"
          />
        </Link>
        {/* Hamburger Menu (only for non-admin users) */}
        {userRole !== "admin" && (
          <button
            className="text-black text-2xl lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HiMenu />
          </button>
        )}
      </div>

      {/* Sidebar Menu Items (Visible when Hamburger is toggled) */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50">
          <div className="p-4">
            <button
              className="text-orange-500 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
          </div>
          <ul className="space-y-2 p-4">
            {userMenuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsMenuOpen(false); // Close menu on navigation
                }}
                className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-orange-100 text-orange-600"
              >
                <item.icon />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Log Out Button */}
      <nav className="flex items-center space-x-6">
        {isLoggedIn ? (
          <button
            onClick={logout}
            className="flex items-center text-white bg-orange-500 rounded-full px-4 py-2 hover:bg-orange-600"
          >
            <FaSignInAlt /> 
            <span className="pl-2"> Log Out</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center bg-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-600"
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        )}
      </nav>

      {/* Notification Popup */}
      {showNotification && (
        <NotificationPopup
          lowStockItems={lowStockItems}
          setLowStockItems={setLowStockItems}
        />
      )}
    </header>
  );
};

export default Header;
