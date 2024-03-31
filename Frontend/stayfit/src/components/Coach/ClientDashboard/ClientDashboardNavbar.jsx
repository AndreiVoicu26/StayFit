import React from "react";

function ClientDashboardNavbar({ clientId }) {
  return (
    <div className="row align-items-center ms-md-5 mb-3 mb-xl-0">
      <div className="col-4 mt-3 mb-xl-3">
        <div className="card h-100 shortcut">
          <div className="card-body">
            <a href={`/client/${clientId}/tracker`} className="text-center">
              <h5 className="mb-0">Tracker</h5>
            </a>
          </div>
        </div>
      </div>
      <div className="col-4 mt-3 mb-xl-3">
        <div className="card h-100 shortcut">
          <div className="card-body">
            <a href={`/client/${clientId}/workout`} className="text-center">
              <h5 className="mb-0">Workout</h5>
            </a>
          </div>
        </div>
      </div>
      <div className="col-4 mt-3 mb-xl-3">
        <div className="card h-100 shortcut">
          <div className="card-body">
            <a href={`/client/${clientId}/nutrition`} className="text-center">
              <h5 className="mb-0">Nutrition</h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboardNavbar;
