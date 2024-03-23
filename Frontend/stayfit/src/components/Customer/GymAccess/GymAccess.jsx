import React from "react";
import Navbar from "../Navbar";
import QRCodeCard from "./QRCodeCard";
import Map from "./Map";

function GymAccess() {
  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="gym-access">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Gym Access</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <QRCodeCard />
            <Map />
          </div>
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-12 mt-3 mb-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0 text-center">
                    40% Discount for Gym Access with any active membership
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GymAccess;
