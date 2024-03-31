import { React, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../Auth/AuthProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

function Navbar() {
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
      </header>
      <div id="sidebar" className={`sidebar ${isSidebarVisible && "show"}`}>
        <nav class="nav">
          <div>
            <div class="nav_logo">
              <img class="img-fluid" src="images/logo_2.png" />
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
    </div>
  );
}

export default Navbar;
