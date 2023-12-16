import { React, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const location = useLocation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const isLinkActive = (to) => {
    return location.pathname === to;
  };

  const { id } = useParams();

  return (
    <div>
      <header className={`header ${isSidebarVisible && "pd-header"}`}>
        <div class="toggle">
          <i
            className={`fa-solid fa-bars ${isSidebarVisible && "fa-x"}`}
            onClick={() => setSidebarVisible(!isSidebarVisible)}
          ></i>
        </div>
        <div class="img">
          <a href="/coach-profile">
            <img
              src="https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
              alt="profile-picture"
            />
          </a>
        </div>
      </header>
      <div className={`sidebar ${isSidebarVisible && "show"}`}>
        <nav class="nav">
          <div>
            <div class="nav_logo">
              <img class="img-fluid" src="/../images/logo_2.png" />
            </div>
            {id != null ? (
              <>
                <Link
                  to="/clients"
                  className={`nav_link mb-5 ${
                    isLinkActive("/clients") && "active"
                  }`}
                >
                  <PeopleIcon /> <span>Clients</span>
                </Link>
                <Link
                  to={`/client/${id}`}
                  className={`nav_link ${
                    isLinkActive(`/client/${id}`) && "active"
                  }`}
                >
                  <DashboardIcon /> <span>Dashboard</span>
                </Link>
                <Link
                  to={`/client/${id}/tracker`}
                  className={`nav_link ${
                    isLinkActive(`/client/${id}/tracker`) && "active"
                  }`}
                >
                  <TrendingUpIcon /> <span>Tracker</span>
                </Link>
                <Link
                  to={`/client/${id}/workout`}
                  className={`nav_link ${
                    isLinkActive(`/client/${id}/workout`) && "active"
                  }`}
                >
                  <FitnessCenterIcon /> <span>Workout</span>
                </Link>
                <Link
                  to={`/client/${id}/nutrition`}
                  className={`nav_link ${
                    isLinkActive(`/client/${id}/nutrition`) && "active"
                  }`}
                >
                  <RestaurantIcon /> <span>Nutrition</span>
                </Link>
              </>
            ) : (
              <Link
                to="/clients"
                className={`nav_link ${isLinkActive("/clients") && "active"}`}
              >
                <PeopleIcon /> <span>Clients</span>
              </Link>
            )}
          </div>
          <Link to="/" className={`nav_link ${isLinkActive("/") && "active"}`}>
            <LogoutIcon /> <span>Log Out</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
