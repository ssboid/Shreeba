import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaBell } from "react-icons/fa";
import Cookies from "js-cookie";
import HeaderLogo from "../../assets/brand/header-logo.png";
import { getGoods } from "../../services/goodsApi";
import NotificationPopup from "../components/NotificationPopup";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(""); // State for user role

  const [scrollDirection, setScrollDirection] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [lowStockItems, setLowStockItems] = useState([]); // State for low stock items
  const [showNotification, setShowNotification] = useState(false); // State to toggle notification popup

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

        const storedLowStockItems = JSON.parse(localStorage.getItem("lowStockItems")) || [];
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
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={HeaderLogo}
          alt="Shreeba Collection Logo"
          className="h-12 w-auto"
        />
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="items-center space-x-6 flex">
        {/* Notification Icon (Visible only for Admins) */}
        {userRole === "admin" && (
          <div className="relative">
            <FaBell
              size={24}
              className="cursor-pointer text-orange-500"
              onClick={() => setShowNotification(!showNotification)}
            />
            {lowStockItems.length > 0 && (
              <span
                className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ transform: "translate(50%, -50%)" }}
              >
                {lowStockItems.length}
              </span>
            )}
          </div>
        )}

     

        {isLoggedIn ? (
          <button
            onClick={logout}
            className="flex align-center items-center  text-white rounded-full px-4 py-2 bg-orange-500 hover:bg-orange-600 space-x-2"
          >
            <FaSignInAlt />
            <span>Log Out</span>
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex align-center items-center bg-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-600 space-x-2"
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
