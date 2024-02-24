import React, { useEffect } from "react";
import { useAuth } from "../../Auth/AuthProvider";

function Navbar() {
  const { authenticated, role, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-scrolled" id="navbar">
      <div className="container-xl">
        <a className="navbar-brand align-items-center" href="">
          <img
            className="img-fluid navbar-logo"
            src="images/logo_1.png"
            alt="logo"
          />
          #stay
          <span>fit</span>
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars"></span>
          Menu
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="">
                <span>Home</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <span>About</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <span>Services</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <span>Coaches</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <span>Membership</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <span>Contact</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href={
                  authenticated
                    ? role === "CUSTOMER"
                      ? "/dashboard"
                      : "/clients"
                    : "/login"
                }
              >
                <span>
                  <i className="bi bi-person-circle"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
