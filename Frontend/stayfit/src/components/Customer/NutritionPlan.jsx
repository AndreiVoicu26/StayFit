import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Schedule from "./Schedules/Schedule";
import MobileSchedule from "./Schedules/MobileSchedule";
import axios from "axios";

function NutritionPlan() {
  const [activeDay, setActiveDay] = useState(null);
  const [meals, setMeals] = useState({});

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

  const fetchMeals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/customer/meals/${activeDay}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setMeals(response.data);
        console.log("Meals fetched successfully");
      }
    } catch (error) {
      console.log("Error fetching meals: ", error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [activeDay]);

  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="workout-nutrition">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Nutrition Plan</h1>
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
            <div className="col-xl-12 mt-lg-3">
              {!activeDay ? (
                <div className="card">
                  <div className="card-body text-center">
                    <h3 className="mb-0 fw-bold">
                      Select a day to see the plan
                    </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card">
                    <div className="card-body">
                      <h3 className="mb-0 fw-bold">
                        Nutrition Plan for {activeDay}
                      </h3>
                    </div>
                  </div>
                  {["Breakfast", "Lunch", "Dinner", "Snacks"].map(
                    (mealType, index) => (
                      <div className="card my-3" key={index}>
                        <div className="card-header d-flex">
                          <h4 className="mb-0 me-auto fw-bold">{mealType}</h4>
                        </div>
                        <div className="card-body">
                          {meals &&
                            meals
                              .filter(
                                (mealElement) =>
                                  mealElement.mealType ===
                                  mealType.toUpperCase()
                              )
                              .map((mealElement, mealIndex) => (
                                <div key={mealIndex} className="d-flex">
                                  <h4 className="mb-0">{mealElement.name}</h4>
                                  <h4 className="mb-0 mx-3">
                                    {mealElement.details && "-"}
                                  </h4>
                                  <h4 className="mb-0">
                                    {mealElement.details}
                                  </h4>
                                  <hr />
                                </div>
                              ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPlan;
