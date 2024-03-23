import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

function Map() {
  const gymLocations = [
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
  ];
  const customIcon = new Icon({
    iconUrl: "./images/placeholder.png",
    iconSize: [35, 35],
  });

  return (
    <div className="col-xl-6 mt-3">
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0 text-center">Available Gyms & Fitness Centers</h3>
        </div>
        <div className="card-body p-2">
          <MapContainer
            center={[45.754041274166866, 21.22584833899618]}
            zoom={12}
            style={{ height: "400px" }}
            attributionControl={false}
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
  );
}

export default Map;
