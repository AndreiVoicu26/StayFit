import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";

function CoachesTable({ coachesData, fetchCoaches }) {
  const [userToDelete, setUserToDelete] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = (user) => {
    console.log(user);
    if (user.hasClients === "true") {
      alert("This coach has clients and cannot be deleted !");
      return;
    }
    setOpen(true);
    setUserToDelete(user);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCoach = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/coach/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchCoaches();
        handleClose();
        console.log("Coach deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting coach:", error);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr style={{ width: "100%" }}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Qualification</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {coachesData.map((coach) => (
          <tr key={coach.id}>
            <td>{coach.firstName}</td>
            <td>{coach.lastName}</td>
            <td>{coach.qualification}</td>
            <td>{coach.email}</td>
            <td>{coach.phone}</td>
            <td
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button className="ms-1">
                <i className="fa-solid fa-pen-to-square d-flex align-items-center fs-3"></i>
              </button>
              <button className="ms-1" onClick={() => handleClickOpen(coach)}>
                <i className="fa-solid fa-trash d-flex align-items-center fs-3"></i>
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  Are you sure you want to delete coach {userToDelete.firstName}{" "}
                  {userToDelete.lastName}?
                </DialogTitle>
                <DialogActions>
                  <Button sx={{ color: "black" }} onClick={handleClose}>
                    No
                  </Button>
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => handleDeleteCoach(userToDelete.id)}
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CoachesTable;
