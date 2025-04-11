import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on component mount
    const user = localStorage.getItem("yogaAppUser");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUsername(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("yogaAppUser");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <div className="navbarElement">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              YOGA App
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about">
                    <a className="nav-link active" aria-current="page" href="#">
                      About Us
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/learn">
                    <a className="nav-link active" aria-current="page" href="#">
                      Start Learning
                    </a>
                  </Link>
                </li>
              </ul>
              <div className="d-flex">
                {isLoggedIn ? (
                  <>
                    <span className="navbar-text me-3">
                      Welcome, {username}
                    </span>
                    <button 
                      onClick={handleLogout} 
                      className="btn btn-outline-danger"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <button className="btn btn-outline-primary me-2">
                        Login
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button className="btn btn-primary">
                        Sign Up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;