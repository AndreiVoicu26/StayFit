import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Navbar from "./Navbar";
import axios from "axios";

function Clients() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = () => {
    const filteredClients = clients.filter((client) =>
      (client.firstName + " " + client.lastName)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setClients(filteredClients);
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/coach/clients",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setClients(response.data);
        console.log("Clients fetched successfully");
      }
    } catch (error) {
      console.log("Error fetching clients", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="clients">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Clients</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row ms-md-5">
            <div class="col-xl-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between form">
                  <input
                    class="form-control fs-5 me-2"
                    type="text"
                    placeholder="Search for name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary ms-2"
                    onClick={() => handleFilter()}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row ms-md-5">
            {clients.length === 0 ? (
              <div>
                <div className="card">
                  <div className="card-header text-center">
                    <h3 className="mb-0">No clients found</h3>
                  </div>
                </div>
              </div>
            ) : (
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  400: 1,
                  600: 2,
                  800: 3,
                  1000: 4,
                  1200: 5,
                }}
              >
                <Masonry>
                  {clients.map((client) => (
                    <Link to={`/client/${client.id}`}>
                      <div className="card user">
                        <div className="card-body text-center">
                          <div className="img profile mb-2">
                            <img
                              src={
                                client.profilePicture
                                  ? `data:image/jpeg;base64,${client.profilePicture}`
                                  : "images/user.png"
                              }
                              alt="Profile Picture"
                            />
                          </div>
                          <h3 className="mb-0">{client.firstName}</h3>
                          <h3 className="mb-0">{client.lastName}</h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
