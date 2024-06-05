import React, { useState, useEffect } from "react";
import { useCheckMobileScreen } from "../../Utils/WindowSizeCheck";
import Navbar from "../Navbar";
import Schedule from "../../Utils/Schedules/Schedule";
import MobileSchedule from "../../Utils/Schedules/MobileSchedule";
import Meal from "./Meal";
import axios from "axios";
import API_URL from "../../../config";

function NutritionPlan() {
  const [activeDay, setActiveDay] = useState(null);
  const [meals, setMeals] = useState({});

  const fetchMeals = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/customer/meals/${activeDay}`,
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
                      <Meal meals={meals} mealType={mealType} index={index} />
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
