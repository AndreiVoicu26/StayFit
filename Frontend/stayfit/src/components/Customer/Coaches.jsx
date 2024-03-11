import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

function Coaches() {
  const [personalCoach, setPersonalCoach] = useState(null);
  const [coaches, setCoaches] = useState([]);

  const fetchCoaches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/coaches",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCoaches(response.data);
        console.log("Coaches fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching coaches", error);
    }
  };

  const fetchPersonalCoach = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/coach",
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (response.data !== "") {
          setPersonalCoach(response.data);
          console.log("Personal coach fetched successfully");
        }
      }
    } catch (error) {
      console.error("Error fetching personal coach", error);
    }
  };

  const handleChooseCoach = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/customer/coaches/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Coach chosen successfully");
        fetchPersonalCoach();
      }
    } catch (error) {
      console.error("Error choosing coach", error);
    }
  };

  const handleRemoveCoach = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/customer/coach`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Coach deleted successfully");
        fetchPersonalCoach();
      }
    } catch (error) {
      console.error("Error deleting coach", error);
    }
  };

  useEffect(() => {
    fetchCoaches();
    fetchPersonalCoach();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="coaching">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Coaches</h1>
              </div>
            </div>
          </div>
        </div>
        {personalCoach ? (
          <div className="container px-4 sections">
            <div className="row ms-md-5">
              <div className="col-xl-12 mt-3">
                <div className="card">
                  <div className="card-header">
                    <h3 className="mb-0">
                      Your coach is {personalCoach.firstName}{" "}
                      {personalCoach.lastName}
                    </h3>
                  </div>
                  <div className="card-body">
                    <h5 className="mb-0 top d-flex">
                      Press <i class="fa fa-minus mx-2"></i> to cancel the
                      partnership.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row ms-md-5">
              <div className="col-xl-12 mt-3 mb-3">
                <div className="card">
                  <header>
                    <div class="img profile">
                      <img
                        src={
                          personalCoach.profilePicture
                            ? `data:image/jpeg;base64,${personalCoach.profilePicture}`
                            : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                        }
                      />
                    </div>
                  </header>
                  <h3 className="name">
                    {personalCoach.firstName} {personalCoach.lastName}
                  </h3>
                  <h5 className="role">{personalCoach.qualification}</h5>
                  <hr className="w-50 mx-auto mt-1" />
                  <div class="description">
                    <p>{personalCoach.description}</p>
                  </div>
                  <hr className="w-50 mx-auto" />
                  <h6 className="text-center">Email: {personalCoach.email}</h6>
                  <h6 className="text-center mb-3">
                    Phone:{" "}
                    {personalCoach.phone
                      ? personalCoach.phone
                      : "Not available"}
                  </h6>
                  <div class="text-center choose">
                    <a
                      href=""
                      onClick={() => handleRemoveCoach(personalCoach.id)}
                    >
                      <i class="fa fa-minus"></i>
                    </a>
                  </div>
                  <footer className="mt-4">
                    <a href="">
                      <i class="fa fa-whatsapp"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-linkedin"></i>
                    </a>
                    <a href="">
                      <i class="fa fa-instagram"></i>
                    </a>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container px-4 sections">
            <div className="row ms-md-5">
              <div class="col-xl-12 mt-3">
                <div className="card">
                  <div className="card-header">
                    <h3 className="mb-0">You haven't chosen any coach yet.</h3>
                  </div>
                  <div className="card-body">
                    <h5 className="top d-flex">
                      Press <i class="fa fa-plus mx-2"></i> to choose your
                      coach.
                    </h5>
                    <h5 className="mb-0">
                      You can cancel your partnership with your coach anytime.
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="row align-items-stretch ms-md-5">
              {coaches.map((coach) => (
                <div className="col-xl-4 mt-3 mb-3" key={coach.id}>
                  <div className="card">
                    <header>
                      <div className="img profile">
                        <img
                          src={
                            coach.profilePicture
                              ? `data:image/jpeg;base64,${coach.profilePicture}`
                              : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                          }
                          alt={coach.profilePicture}
                        />
                      </div>
                    </header>
                    <h3 className="name">
                      {coach.firstName} {coach.lastName}
                    </h3>
                    <h5 className="role">{coach.qualification}</h5>
                    <hr className="w-50 mx-auto mt-1" />
                    <div className="description">
                      <p>{coach.description}</p>
                    </div>
                    <hr className="w-50 mx-auto" />
                    <h6 className="text-center">Email: {coach.email}</h6>
                    <h6 className="text-center mb-3">
                      Phone: {coach.phone ? coach.phone : "Not available"}
                    </h6>
                    <div className="text-center choose">
                      <a href="" onClick={() => handleChooseCoach(coach.id)}>
                        <i className="fa fa-plus"></i>
                      </a>
                    </div>
                    <footer className="mt-4">
                      <a href="">
                        <i class="fa fa-whatsapp"></i>
                      </a>
                      <a href="">
                        <i class="fa fa-facebook"></i>
                      </a>
                      <a href="">
                        <i class="fa fa-linkedin"></i>
                      </a>
                      <a href="">
                        <i class="fa fa-instagram"></i>
                      </a>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Coaches;
