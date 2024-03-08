import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import axios from "axios";

function AdminDashboard() {
  const [coachesView, setCoachesView] = useState(true);
  const [customersView, setCustomersView] = useState(false);
  const [coachesData, setCoachesData] = useState([]);
  const [newCoach, setNewCoach] = useState({
    firstName: "",
    lastName: "",
    qualification: "",
    email: "",
    username: "",
    password: "",
  });
  const [customersData, setCustomersData] = useState([]);
  const [addCoach, setAddCoach] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = (user) => {
    setOpen(true);
    setUserToDelete(user);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchCoaches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/coaches",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCoachesData(response.data);
      }
    } catch (error) {
      console.log("Error fetching coaches:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/admin/customers",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCustomersData(response.data);
      }
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  const handleAddCoach = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/admin/coach",
        newCoach,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchCoaches();
        setAddCoach(false);
        console.log("Coach added successfully");
      }
    } catch (error) {
      console.log("Error adding coach:", error);
    }
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

  const handleCustomerStatus = async (id) => {
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
        console.log("Customer status changed successfully");
      }
    } catch (error) {
      console.log("Error changing customer status:", error);
    }
  };

  useEffect(() => {
    fetchCoaches();
    fetchCustomers();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="img js-fullheight content-background"></div>
      <div id="dashboard">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Management</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-12 mt-3">
              {coachesView ? (
                <div className="card">
                  <div className="card-header d-flex justify-content-between ps-4">
                    {addCoach ? (
                      <div className="card h-100 w-100">
                        <div className="card-header">Add Coach</div>
                        <div className="card-body">
                          <div className="d-flex">
                            <input
                              className="form-control me-2"
                              type="text"
                              placeholder="First Name"
                              value={newCoach.firstName}
                              onChange={(e) =>
                                setNewCoach({
                                  ...newCoach,
                                  firstName: e.target.value,
                                })
                              }
                            />
                            <input
                              className="form-control ms-2"
                              type="text"
                              placeholder="Last Name"
                              value={newCoach.lastName}
                              onChange={(e) =>
                                setNewCoach({
                                  ...newCoach,
                                  lastName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <input
                            className="form-control mt-2"
                            type="text"
                            placeholder="Qualification"
                            value={newCoach.qualification}
                            onChange={(e) =>
                              setNewCoach({
                                ...newCoach,
                                qualification: e.target.value,
                              })
                            }
                          />
                          <input
                            className="form-control mt-2"
                            type="email"
                            placeholder="Email"
                            value={newCoach.email}
                            onChange={(e) =>
                              setNewCoach({
                                ...newCoach,
                                email: e.target.value,
                              })
                            }
                          />
                          <input
                            className="form-control mt-2"
                            type="text"
                            placeholder="Username"
                            value={newCoach.username}
                            onChange={(e) =>
                              setNewCoach({
                                ...newCoach,
                                username: e.target.value,
                              })
                            }
                          />
                          <input
                            className="form-control mt-2"
                            type="text"
                            placeholder="Password"
                            value={newCoach.password}
                            onChange={(e) =>
                              setNewCoach({
                                ...newCoach,
                                password: e.target.value,
                              })
                            }
                          />
                          <button
                            className="mt-2 me-1"
                            onClick={() => handleAddCoach()}
                          >
                            <i className="fa-solid fa-floppy-disk d-flex align-items-center fs-3 "></i>
                          </button>
                          <button
                            className="mt-2 ms-1"
                            onClick={() => setAddCoach(false)}
                          >
                            <i className="fa-solid fa-xmark d-flex align-items-center fs-3 "></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="mb-0">Coaches View</h3>
                        <button onClick={() => setAddCoach(true)}>
                          <i className="fa-solid fa-plus d-flex align-items-center fs-3 "></i>
                        </button>
                      </>
                    )}
                  </div>
                  <div style={{ overflowX: "auto" }} className="card-body p-0">
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
                              <button
                                className="ms-1"
                                onClick={() => handleClickOpen(coach)}
                              >
                                <i className="fa-solid fa-trash d-flex align-items-center fs-3"></i>
                              </button>
                              <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>
                                  Are you sure you want to delete coach{" "}
                                  {userToDelete.firstName}{" "}
                                  {userToDelete.lastName}?
                                </DialogTitle>
                                <DialogActions>
                                  <Button onClick={handleClose}>No</Button>
                                  <Button
                                    onClick={() =>
                                      handleDeleteCoach(userToDelete.id)
                                    }
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
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between ps-4">
                      <h3 className="mb-0">Customers View</h3>
                    </div>
                    <div
                      style={{ overflowX: "auto" }}
                      className="card-body p-0"
                    >
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
                                  onClick={() =>
                                    handleCustomerStatus(customer.id)
                                  }
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
                                    {userToDelete.firstName}{" "}
                                    {userToDelete.lastName}?
                                  </DialogTitle>
                                  <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button
                                      onClick={() =>
                                        handleDeleteCustomer(userToDelete.id)
                                      }
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
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row align-items-center ms-md-5">
            <div className="col-lg-6 col-xl-6 mt-3 mb-3">
              <div className="card h-100 shortcut">
                <div
                  className="card-body btn"
                  onClick={() => {
                    setCoachesView(true);
                    setCustomersView(false);
                  }}
                >
                  <h5 className="mb-0 text-center">Coaches View</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 mt-3 mb-3">
              <div className="card h-100 shortcut">
                <div
                  className="card-body btn"
                  onClick={() => {
                    setCustomersView(true);
                    setCoachesView(false);
                  }}
                >
                  <h5 className="mb-0 text-center">Customers View</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
