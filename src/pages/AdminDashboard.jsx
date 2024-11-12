import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Import the hamburger icon
import HeaderLogo from "C:/Users/Lenovo/Desktop/final year/Shreebaapp/Shreeba/src/assets/brand/header-logo.png";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between bg-secondary100 p-4 text-black">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={HeaderLogo} alt="Logo" className="h-12 w-auto" />
      </Link>

      {/* Hamburger Icon (Visible only on small screens) */}
      <button 
        className="sm:hidden flex items-center justify-center space-x-2"
        onClick={toggleMenu}
      >
        <FaBars className="text-black text-2xl" /> {/* Use FaBars for the hamburger icon */}
      </button>

      {/* Navigation Links */}
      <nav className={`sm:flex items-center space-x-4 ${isMenuOpen ? "block sm:hidden" : "hidden sm:flex"}`}>
        <Link to="/browse" className="text-black hover:text-gray-700">
          BROWSE
        </Link>
        <form className="relative">
          <input
            type="search"
            name="query"
            placeholder="Search..."
            className="bg-gray-100 rounded-full py-1 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to="/search">
            <button type="button" className="absolute right-1 top-1 text-black hover:text-gray-700">
              <i className="fas fa-search"></i>
            </button>
          </Link>
        </form>
        <button onClick={logout} className="text-black hover:text-gray-700">
          LOGIN
        </button>
      </nav>
    </header>
  );
};

export default AdminDashboard;
