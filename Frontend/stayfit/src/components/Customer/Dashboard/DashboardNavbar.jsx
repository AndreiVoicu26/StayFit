import React from "react";

function DashboardNavbar() {
  return (
    <div className="row align-items-center ms-md-5 mb-3 mb-xl-0">
      <div className="col-md-3 col-6 mt-3 mb-xl-3">
        <div className="card h-100 shortcut">
          <div className="card-body">
            <a href="/tracker" className="text-center">
              <h5 className="mb-0">Tracking</h5>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-6 mt-3 mb-xl-3">
        <div className="card h-100 shortcut">
          <div className="card-body">
            <a href="/workout" className="text-center">
              <h5 className="mb-0">Workout</h5>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-6 mt-3 mb-xl-3">
        <div className="card h-100 shortcut">
          <div className="card-body">
            <a href="/nutrition" className="text-center">
              <h5 className="mb-0">Nutrition</h5>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-3 col-6 mt-3 mb-xl-3">
        <div className="card h-100 shortcut">
          <div className="card-body">
            <a href="/gym-access" className="text-center">
              <h5 className="mb-0">Gym</h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
