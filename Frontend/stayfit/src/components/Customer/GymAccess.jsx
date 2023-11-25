import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import QRCode from "react-qr-code";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

function GymAccess() {
  const [gymLocations, setGymLocations] = useState([
    {
      name: "Gym One 2",
      location: [45.73914839787649, 21.236831307302552],
      website: "https://www.gymone.ro/",
    },
    {
      name: "Gym One 3",
      location: [45.74902195512095, 21.239439693075536],
      website: "https://www.gymone.ro/",
    },
    {
      name: "Gym One 5",
      location: [45.757886675425894, 21.21799576097465],
      website: "https://www.gymone.ro/",
    },
    {
      name: "Gym One 6",
      location: [45.778315667984884, 21.244273786173892],
      website: "https://www.gymone.ro/",
    },
    {
      name: "Smartfit Studio 1",
      location: [45.77007381164263, 21.218631998594415],
      website: "https://www.smartfitstudio.ro/",
    },
    {
      name: "Smartfit Studio 2",
      location: [45.735460761802656, 21.262468039040535],
      website: "https://www.smartfitstudio.ro/",
    },
    {
      name: "Smartfit Studio 3",
      location: [45.72670057835597, 21.200316787920862],
      website: "https://www.smartfitstudio.ro/",
    },
    {
      name: "WorldClass",
      location: [45.78893063469505, 21.236132313824758],
      website: "https://www.worldclass.ro/",
    },
    {
      name: "SmartFit",
      location: [45.73032302767341, 21.220144996365626],
      website: "https://www.planetfitness.com/",
    },
  ]);

  const customIcon = new Icon({
    iconUrl: "./images/placeholder.png",
    iconSize: [35, 35],
  });

  const generateRandomQRCode = () => {
    const randomValue = Math.random().toString(36).substring(7);
    return randomValue;
  };
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
            <div className="col-xl-6 mt-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0 text-center">
                    Scan this QR Code for Gym Access
                  </h3>
                </div>
                <div className="card-body text-center p-1">
                  <h3 className="mb-3">Andrei Voicu</h3>
                  <QRCode value={() => generateRandomQRCode()} />
                  <h4 className="mt-3">
                    Membership Status: <span className="active">Active</span>
                  </h4>
                  <h4 className="mb-0">
                    Available until: <span>July 15 / 2024</span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-xl-6 mt-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0 text-center">
                    Available Gyms & Fitness Centers
                  </h3>
                </div>
                <div className="card-body p-2">
                  <MapContainer
                    center={[45.754041274166866, 21.22584833899618]}
                    zoom={12}
                    style={{ height: "400px" }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {gymLocations.map((location, index) => (
                      <Marker
                        key={index}
                        position={location.location}
                        icon={customIcon}
                      >
                        <Popup>
                          <div className="d-flex">
                            <h6 className="mb-0">{location.name}</h6>
                            <a href={location.website} className="d-flex">
                              <i class="fa-solid fa-up-right-from-square d-flex align-items-center ms-2"></i>
                            </a>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-12 mt-3 mb-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0 text-center">
                    50% Discount for Gym Access with any active membership
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
