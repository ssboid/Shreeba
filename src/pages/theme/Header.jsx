import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaThList, FaSearch, FaSignInAlt } from "react-icons/fa";
import HeaderLogo from "../../assets/brand/header-logo.png";

const Header = () => {
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
    <header className="flex items-center justify-between bg-secondary100 py-4 px-[8.33%] text-black border-b border-gray-200 relative">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={HeaderLogo} alt="Shreeba Collection Logo" className="h-12 w-auto" />
      </Link>

      {/* Hamburger Icon (Visible only on small screens) */}
      <button
        className="sm:hidden flex items-center justify-center"
        onClick={toggleMenu}
      >
        <FaBars className="text-primary1000 text-2xl" />
      </button>

      {/* Desktop Navigation Links */}
      <nav className="hidden sm:flex items-center space-x-6">
        <Link to="/browse" className="flex items-center text-primaryOrange hover:text-gray-700 space-x-1">
          <FaThList />
          <span>Browse</span>
        </Link>

        <form className="flex items-center space-x-2">
          <input
            type="search"
            name="query"
            placeholder="Search..."
            className="bg-gray-100 rounded-full py-2 px-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="bg-primaryOrange text-white rounded-full px-4 py-2 hover:bg-opacity-90"
          >
            Search
          </button>
        </form>

        <button
          onClick={logout}
          className="flex items-center text-primaryOrange hover:text-gray-700 space-x-1"
        >
          <FaSignInAlt />
          <span>Login</span>
        </button>
      </nav>

      {/* Mobile Menu - Vertical List */}
      {isMenuOpen && (
        <div className="px-[8.33%] absolute top-16 left-0 w-full bg-secondary100 flex flex-col items-start p-4 space-y-4 sm:hidden">
          <Link to="/browse" className="flex items-center text-primaryOrange hover:text-gray-700 space-x-1">
            <FaThList />
            <span>Browse</span>
          </Link>

          <form className="flex items-center space-x-2 w-full">
            <input
              type="search"
              name="query"
              placeholder="Search..."
              className="bg-gray-100 rounded-full py-2 px-4 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="bg-primaryOrange text-white rounded-full px-4 py-2 hover:bg-opacity-90"
            >
              Search
            </button>
          </form>

          <button
            onClick={logout}
            className="flex items-center text-primaryOrange hover:text-gray-700 space-x-1"
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
