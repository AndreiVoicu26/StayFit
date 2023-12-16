import { React, useState } from "react";
import Navbar from "./Navbar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";

function Clients() {
  const initialClients = [
    {
      id: 1,
      name: "Andrei Voicu",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 2,
      name: "Liam Johnson",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 3,
      name: "Olivia Smith",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 4,
      name: "Ethan Davis",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 5,
      name: "Anastasia Brown",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 6,
      name: "Noah Taylor",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
    {
      id: 7,
      name: "Sophia Martinez",
      imageUrl:
        "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
    },
  ];

  const [clients, setClients] = useState(initialClients);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilter = () => {
    const filteredClients = initialClients.filter((client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setClients(filteredClients);
  };

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
                    id="inputUsername"
                    type="text"
                    placeholder="Search for name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary ms-2"
                    onClick={handleFilter}
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
                    <h3 className="mb-0">
                      No client found for the specified name
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <ResponsiveMasonry
                  columnsCountBreakPoints={{ 400: 2, 800: 3, 1000: 4, 1200: 5 }}
                >
                  <Masonry>
                    {clients.map((client) => (
                      <Link to={`/client/${client.id}`}>
                        <div className="card user">
                          <div className="card-body text-center">
                            <div className="img profile mb-2">
                              <img src={client.imageUrl}></img>
                            </div>
                            <h3 className="mb-0">{client.name}</h3>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </Masonry>
                </ResponsiveMasonry>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
