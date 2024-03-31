import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import Schedule from "../../Utils/Schedules/Schedule";
import MobileSchedule from "../../Utils/Schedules/MobileSchedule";
import Meal from "./Meal";
import AddMeal from "./AddMeal";
import EditMeal from "./EditMeal";
import axios from "axios";

function ClientNutritionPlan() {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [activeDay, setActiveDay] = useState(null);
  const [meals, setMeals] = useState({});
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [meal, setMeal] = useState({
    name: "",
    details: "",
    mealType: "",
    dayOfWeek: "",
  });
  const [editingMealIndex, setEditingMealIndex] = useState(null);

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

  const fetchClient = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/coach/client/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setClient(response.data);
        console.log("Client fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching client", error);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/coach/client/${id}/meals/${activeDay}`,
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
    fetchClient();
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
                <h1 className="title ms-md-3">
                  Nutrition Plan - {client.firstName} {client.lastName}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            {useCheckMobileScreen()
              ? meals && (
                  <MobileSchedule
                    activeDay={activeDay}
                    setActiveDay={setActiveDay}
                  />
                )
              : meals && (
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
                          <i
                            className="fa-solid fa-plus d-flex align-items-center fs-3"
                            onClick={() => setShowAddMeal(index)}
                          ></i>
                        </div>
                        <div className="card-body">
                          {showAddMeal === index && (
                            <AddMeal
                              clientId={id}
                              activeDay={activeDay}
                              mealType={mealType}
                              meal={meal}
                              setMeal={setMeal}
                              setShowAddMeal={setShowAddMeal}
                              fetchMeals={fetchMeals}
                            />
                          )}
                          {meals &&
                            meals
                              .filter(
                                (mealElement) =>
                                  mealElement.mealType ===
                                  mealType.toUpperCase()
                              )
                              .map((mealElement, mealIndex) => (
                                <div key={mealIndex} className="mt-3">
                                  {editingMealIndex &&
                                  editingMealIndex.mealType === mealType &&
                                  editingMealIndex.mealIndex === mealIndex ? (
                                    <EditMeal
                                      clientId={id}
                                      meal={meal}
                                      setMeal={setMeal}
                                      setEditingMealIndex={setEditingMealIndex}
                                      mealElement={mealElement}
                                      fetchMeals={fetchMeals}
                                    />
                                  ) : (
                                    <Meal
                                      clientId={id}
                                      mealElement={mealElement}
                                      setMeal={setMeal}
                                      setEditingMealIndex={setEditingMealIndex}
                                      fetchMeals={fetchMeals}
                                      mealIndex={mealIndex}
                                      mealType={mealType}
                                    />
                                  )}
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

export default ClientNutritionPlan;
