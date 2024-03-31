import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import AddCoach from "./Coaches/AddCoach";
import CoachesTable from "./Coaches/CoachesTable";
import CustomersTable from "./Customers/CustomersTable";
import axios from "axios";

function AdminDashboard() {
  const [coachesView, setCoachesView] = useState(true);
  const [coachesData, setCoachesData] = useState([]);
  const [customersData, setCustomersData] = useState([]);
  const [addCoach, setAddCoach] = useState(false);

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
                  <div className="card-header d-flex justify-content-between">
                    {addCoach ? (
                      <AddCoach
                        setAddCoach={setAddCoach}
                        fetchCoaches={fetchCoaches}
                      />
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
                    <CoachesTable
                      coachesData={coachesData}
                      fetchCoaches={fetchCoaches}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h3 className="mb-0">Customers View</h3>
                    </div>
                    <div
                      style={{ overflowX: "auto" }}
                      className="card-body p-0"
                    >
                      <CustomersTable
                        customersData={customersData}
                        fetchCustomers={fetchCustomers}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row align-items-center ms-md-5">
            <div className="col-6 mt-3 mb-3">
              <div className="card h-100 shortcut">
                <div
                  className="card-body btn"
                  onClick={() => {
                    setCoachesView(true);
                  }}
                >
                  <h5 className="mb-0 text-center">Coaches</h5>
                </div>
              </div>
            </div>
            <div className="col-6 mt-3 mb-3">
              <div className="card h-100 shortcut">
                <div
                  className="card-body btn"
                  onClick={() => {
                    setCoachesView(false);
                  }}
                >
                  <h5 className="mb-0 text-center">Customers</h5>
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
