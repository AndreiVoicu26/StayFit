import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CustomerChat from "../Utils/CustomerChat";
import axios from "axios";

function Navbar() {
  const [picture, setPicture] = useState(null);
  const [coach, setCoach] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isLinkActive = (to) => {
    return location.pathname === to;
  };

  const fetchPicture = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/user/picture",
        {
          responseType: "blob",
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (response.data.size !== 0) {
          setPicture(response.data);
        }
      }
    } catch (error) {
      console.log("Error fetching picture ", error);
    }
  };

  const fetchCoach = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/coach",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCoach(response.data);
      }
    } catch (error) {
      console.log("Error fetching coach ", error);
    }
  };

  useEffect(() => {
    fetchPicture();
    fetchCoach();
  }, []);

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
          <Link to="/profile">
            <img
              src={picture ? URL.createObjectURL(picture) : "images/user.png"}
              alt="Profile Picture"
            />
          </Link>
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
                <TrendingUpIcon /> <span>Tracker</span>
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
              <Link
                to="/coaches"
                className={`nav_link ${isLinkActive("/coaches") && "active"}`}
              >
                <ConnectWithoutContactIcon /> <span>Coaches</span>
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
              <Button sx={{ color: "black" }} onClick={handleClose}>
                No
              </Button>
              <Button sx={{ color: "black" }} onClick={() => logout()}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </nav>
      </div>
      {coach != null && (
        <div id="chat">
          <CustomerChat />
        </div>
      )}
    </div>
  );
}

export default Navbar;
