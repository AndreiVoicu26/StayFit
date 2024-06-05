import { React, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import CoachChat from "../Utils/CoachChat";
import axios from "axios";
import API_URL from "../../config";

function Navbar() {
  const { id } = useParams();
  const [picture, setPicture] = useState(null);
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
      const response = await axios.get(`${API_URL}/api/v1/user/picture`, {
        responseType: "blob",
        withCredentials: true,
      });
      if (response.status === 200) {
        if (response.data.size !== 0) {
          setPicture(response.data);
        }
      }
    } catch (error) {
      console.log("Error fetching picture ", error);
    }
  };

  useEffect(() => {
    fetchPicture();
  }, []);

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
          <Link to="/coach-profile">
            <img
              src={
                picture
                  ? URL.createObjectURL(picture)
                  : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
              }
              alt="profile-picture"
            />
          </Link>
        </div>
      </header>
      <div className={`sidebar ${isSidebarVisible && "show"}`}>
        <nav class="nav">
          <div>
            <div class="nav_logo">
              <img class="img-fluid" src="/images/logo_2.png" />
            </div>
            <Link
              to="/clients"
              className={`nav_link mb-5 ${
                isLinkActive("/clients") && "active"
              }`}
            >
              <PeopleIcon /> <span>Clients</span>
            </Link>
            {id != null && (
              <div>
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
              </div>
            )}
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
              <Button
                sx={{ color: "black" }}
                onClick={() => logout()}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </nav>
      </div>
      {id != null && (
        <div id="chat">
          <CoachChat clientId={id} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
