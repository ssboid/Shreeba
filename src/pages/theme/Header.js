import React from "react";
import { Link, useNavigate } from "react-router-dom";
import LMB from "../../assets/brand/LMB.png";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isLogin");
    navigate("/login");
  };

  return (
    <div>
      <h1>AdminDashboard</h1>
      <Link to="/">
        <ul>
          <li>
            <img src={Cover} alt="Logo" />
          </li>
          <li>
            LIBRI
            <br />
            <span>MAHITI</span>
          </li>
        </ul>
      </Link>
      <ul>
        <li>
          <Link to="/browse">
            <span>BROWSE</span>
          </Link>
        </li>
        <li>
          <form>
            <input type="search" name="query" placeholder="Search..." />
            <Link to="/search">
              <button type="button">
                <i></i>
              </button>
            </Link>
          </form>
        </li>
        <li onClick={logout}>LOGIN</li>
      </ul>
    </div>
  );
};

export default Header;
