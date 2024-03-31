import React, { useEffect } from "react";
import { useAuth } from "../../Auth/AuthProvider";

function Navbar() {
  const { authenticated, role, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const handleNavLinkClick = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const isNavbarCollapsed =
      navbarToggler.getAttribute("aria-expanded") === "true";
    if (isNavbarCollapsed) {
      navbarToggler.click();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-scrolled" id="navbar">
      <div className="container-xl">
        <a className="navbar-brand align-items-center" href="/">
          <img
            className="img-fluid navbar-logo"
            src="images/logo_1.png"
            alt="Logo"
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
              <a
                className="nav-link"
                href="#about"
                onClick={handleNavLinkClick}
              >
                <span>About</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#services"
                onClick={handleNavLinkClick}
              >
                <span>Services</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#coaches"
                onClick={handleNavLinkClick}
              >
                <span>Coaches</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#pricing"
                onClick={handleNavLinkClick}
              >
                <span>Memberships</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#contact"
                onClick={handleNavLinkClick}
              >
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
                      : role === "COACH"
                      ? "/clients"
                      : "/management"
                    : "/login"
                }
                onClick={handleNavLinkClick}
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
