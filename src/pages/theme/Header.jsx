import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import Cookies from "js-cookie"; // Import js-cookie
import HeaderLogo from "../../assets/brand/header-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  // Check cookie on component mount
  useEffect(() => {
    const loginStatus = Cookies.get("isLogin") === "true"; // Check if isLogin cookie is set to true
    setIsLoggedIn(loginStatus);
  }, []);

  // Handle logout
  const logout = () => {
    Cookies.remove("isLogin"); // Remove isLogin cookie
    Cookies.remove("role"); // Remove role cookie if needed
    setIsLoggedIn(false); // Update login status
    navigate("/login");
  };

  // Toggle menu for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll direction
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection); // Add event listener

    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // Cleanup
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
        <img src={HeaderLogo} alt="Shreeba Collection Logo" className="h-12 w-auto" />
      </Link>

      {/* Desktop Navigation Links */}
      <nav className="items-center space-x-6">
        {isLoggedIn ? (
          // Show 'Log Out' button if logged in
          <button
            onClick={logout}
            className="flex align-center items-center bg-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-600 space-x-2"
          >
            <FaSignInAlt />
            <span>Log Out</span>
          </button>
        ) : (
          // Show 'Login' button if not logged in
          <button
            onClick={() => navigate("/login")}
            className="flex align-center items-center bg-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-600 space-x-2"
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
