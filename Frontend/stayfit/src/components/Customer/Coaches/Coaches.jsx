import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import PersonalCoach from "./PersonalCoach";
import AvailableCoach from "./AvailableCoach";
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
        <div className="container px-4 sections">
          {personalCoach && (
            <PersonalCoach
              personalCoach={personalCoach}
              fetchPersonalCoach={fetchPersonalCoach}
            />
          )}
          <div className="row ms-md-5">
            <div class="col-xl-12 mt-3">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0">Available coaches</h3>
                </div>
                <div className="card-body">
                  {!personalCoach ? (
                    <>
                      <h5 className="top d-flex">
                        Press <i class="fa fa-plus mx-2"></i> to choose your
                        coach.
                      </h5>
                      <h5 className="mb-0">
                        You can cancel your partnership with your coach anytime.
                      </h5>
                    </>
                  ) : (
                    <h5 className="mb-0 top d-flex">
                      Cancel your partnership with your actual coach to choose a
                      new one.
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-stretch ms-md-5">
            {coaches
              .filter((coach) => coach.id !== personalCoach?.id)
              .map((coach) => (
                <AvailableCoach
                  coach={coach}
                  personalCoach={personalCoach}
                  fetchPersonalCoach={fetchPersonalCoach}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coaches;
