import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import HeaderLogo from "../../assets/brand/header-logo.png";

import { useEffect } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);

  
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
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    }
  }, [scrollDirection]);

  const logout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // const scrollDirection = useScrollDirection();

  return (
    <header
      className={`flex items-center sticky ${scrollDirection === "down" ? "-top-24" : "top-0"} justify-between bg-white py-4 px-6 lg:px-[8.33%] text-black border-b border-gray-200 relative transition-all duration-500 z-50`}
    >
    {/* <header className="flex items-center sticky top-0 justify-between bg-secondary100 py-4 px-6 lg:px-[8.33%] text-black border-b border-gray-200 relative"> */}
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src={HeaderLogo} alt="Shreeba Collection Logo" className="h-12 w-auto" />
      </Link>


      {/* Desktop Navigation Links */}
      <nav className=" items-center space-x-6">
        <button
          onClick={logout}
          className="flex align-center items-center bg-orange-500 text-white rounded-full px-4 py-2 hover:bg-orange-600 space-x-2"
        >
          <FaSignInAlt />
          <span>Login</span>
        </button>
      </nav>

    </header>
  );
};

export default Header;
