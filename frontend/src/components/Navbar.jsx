import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./navbar.css"; // Import the CSS file

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user); // Retrieve `user` from the Redux store

  return (
    <nav className={`navbar ${show ? "show_navbar" : ""}`}>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/" onClick={() => setShow(!show)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" onClick={() => setShow(!show)}>
              Active Projects
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/dashboard" onClick={() => setShow(!show)}>
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={() => setShow(!show)}>
                LOGIN
              </Link>
            </li>
          )}
          {isAuthenticated && user && user.role === "Job Seeker" ? (
            <li>
              <Link to="/agency/profile/edit" onClick={() => setShow(!show)}>
                Agency
              </Link>
            </li>
          ) : null}
        </ul>
      </div>
      <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
    </nav>
  );
};

export default Navbar;
