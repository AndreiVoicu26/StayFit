import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Schedule from "./Schedules/Schedule";
import MobileSchedule from "./Schedules/MobileSchedule";
import axios from "axios";

function WorkoutSchedule() {
  const [activeDay, setActiveDay] = useState(null);
  const [workouts, setWorkouts] = useState({});

  const useCheckMobileScreen = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", handleWindowSizeChange);
      return () => {
        window.removeEventListener("resize", handleWindowSizeChange);
      };
    }, []);

    return width <= 992;
  };

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/workouts/${activeDay}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setWorkouts(response.data);
        console.log("Workouts fetched successfully");
      }
    } catch (error) {
      console.log("Error fetching workouts: ", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [activeDay]);

  const handleRedirectToLink = (link) => {
    window.location.href = link;
  };

  const isValidURL = (url) => {
    const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/;
    return urlRegex.test(url);
  };

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="workout-nutrition">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Workout Schedule</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            {useCheckMobileScreen() ? (
              <MobileSchedule
                activeDay={activeDay}
                setActiveDay={setActiveDay}
              />
            ) : (
              <Schedule activeDay={activeDay} setActiveDay={setActiveDay} />
            )}
          </div>
          <div className="row ms-md-5">
            <div className="col-xl-12 mt-lg-3 mb-3">
              {!activeDay ? (
                <div className="card">
                  <div className="card-body text-center">
                    <h3 className="mb-0 fw-bold">
                      Select a day to see the schedule
                    </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h3 className="mb-0 fw-bold">
                        Workout Schedule for {activeDay}
                      </h3>
                    </div>
                  </div>
                  {workouts.length === 0 && (
                    <div className="card mt-3">
                      <div className="card-body">
                        <h3 className="text-center">
                          No workouts for this day
                        </h3>
                      </div>
                    </div>
                  )}
                  {workouts &&
                    workouts.map((workoutElement, workoutIndex) => (
                      <div className="card mt-3" key={workoutIndex}>
                        <div className="card-header">
                          <h4 className="mb-0 me-auto fw-bold">
                            {workoutElement.name}
                          </h4>
                        </div>
                        <div className="card-body">
                          {workoutElement.exercises &&
                            workoutElement.exercises.map(
                              (exerciseElement, exerciseIndex) => (
                                <div key={exerciseIndex} className="d-flex">
                                  <h4 className="mb-0">
                                    {exerciseElement.name}
                                  </h4>
                                  {exerciseElement.link &&
                                    isValidURL(exerciseElement.link) && (
                                      <i
                                        class="fa-solid fa-arrow-up-right-from-square align-items-center fs-4 mx-3 mt-1"
                                        onClick={() =>
                                          handleRedirectToLink(
                                            exerciseElement.link
                                          )
                                        }
                                      ></i>
                                    )}
                                  <h4 className="mb-0 me-3">
                                    {exerciseElement.details && "-"}
                                  </h4>
                                  <h4 className="mb-0">
                                    {exerciseElement.details}
                                  </h4>
                                  <hr />
                                </div>
                              )
                            )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSchedule;
