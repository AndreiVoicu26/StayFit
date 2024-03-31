import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";

function CustomersTable({ customersData, fetchCustomers }) {
  const [userToDelete, setUserToDelete] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = (user) => {
    setOpen(true);
    setUserToDelete(user);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/admin/customer/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchCustomers();
        handleClose();
        console.log("Customer deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting customer:", error);
    }
  };

  const handleDeactivateCustomer = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/admin/customer/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchCustomers();
        handleClose();
        console.log("Customer deactivated successfully");
      }
    } catch (error) {
      console.log("Error deactivating customer:", error);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr style={{ width: "100%" }}>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Status</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customersData.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.status}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <button
                className="ms-1"
                onClick={() => handleDeactivateCustomer(customer.id)}
                disabled={customer.status === "INACTIVE"}
              >
                <i className="fa-solid fa-user-minus d-flex align-items-center fs-3"></i>
              </button>
              <button className="ms-1">
                <i className="fa-solid fa-pen-to-square d-flex align-items-center fs-3"></i>
              </button>
              <button
                className="ms-1"
                onClick={() => handleClickOpen(customer)}
              >
                <i className="fa-solid fa-trash d-flex align-items-center fs-3"></i>
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                  Are you sure you want to delete customer{" "}
                  {userToDelete.firstName} {userToDelete.lastName}?
                </DialogTitle>
                <DialogActions>
                  <Button sx={{ color: "black" }} onClick={handleClose}>
                    No
                  </Button>
                  <Button
                    sx={{ color: "black" }}
                    onClick={() => handleDeleteCustomer(userToDelete.id)}
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

export default CustomersTable;
