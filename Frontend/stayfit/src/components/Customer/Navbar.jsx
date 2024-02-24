import { React, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../Auth/AuthProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function Navbar() {
  const location = useLocation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLinkActive = (to) => {
    return location.pathname === to;
  };

  return (
    <div>
      <header
        id="header"
        className={`header ${isSidebarVisible && "pd-header"}`}
      >
        <div class="toggle">
          <i
            id="toggle"
            className={`fa-solid fa-bars ${isSidebarVisible && "fa-x"}`}
            onClick={() => setSidebarVisible(!isSidebarVisible)}
          ></i>
        </div>
        <div class="img">
          <a href="/profile">
            <img
              src="https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
              alt="profile-picture"
            />
          </a>
        </div>
      </header>
      <div id="sidebar" className={`sidebar ${isSidebarVisible && "show"}`}>
        <nav class="nav">
          <div>
            <div class="nav_logo">
              <img class="img-fluid" src="images/logo_2.png" />
            </div>
            <div class="nav_list">
              <Link
                to="/dashboard"
                className={`nav_link ${isLinkActive("/dashboard") && "active"}`}
              >
                <DashboardIcon /> <span>Dashboard</span>
              </Link>
              <Link
                to="/tracker"
                className={`nav_link ${isLinkActive("/tracker") && "active"}`}
              >
                <TrendingUpIcon /> <span>Goals Tracker</span>
              </Link>
              <Link
                to="/coaches"
                className={`nav_link ${isLinkActive("/coaches") && "active"}`}
              >
                <ConnectWithoutContactIcon /> <span>Coaches</span>
              </Link>
              <Link
                to="/workout"
                className={`nav_link ${isLinkActive("/workout") && "active"}`}
              >
                <FitnessCenterIcon /> <span>Workout</span>
              </Link>
              <Link
                to="/nutrition"
                className={`nav_link ${isLinkActive("/nutrition") && "active"}`}
              >
                <RestaurantIcon /> <span>Nutrition</span>
              </Link>
              <Link
                to="/gym-access"
                className={`nav_link ${
                  isLinkActive("/gym-access") && "active"
                }`}
              >
                <QrCodeIcon /> <span>Gym Access</span>
              </Link>
            </div>
          </div>
          <Link
            onClick={handleClickOpen}
            className={`nav_link ${isLinkActive("/") && "active"}`}
          >
            <LogoutIcon /> <span>Log Out</span>
          </Link>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={() => logout()} autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
