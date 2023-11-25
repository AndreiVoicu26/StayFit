import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Nutrition() {
  const [activeDay, setActiveDay] = useState(null);
  const [meals, setMeals] = useState({});
  const [newMeal, setNewMeal] = useState({ name: "", weight: "" });
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [editingMealIndex, setEditingMealIndex] = useState(null);
  const [editedMeal, setEditedMeal] = useState({ name: "", weight: "" });

  const getCardClassName = (day, index) => {
    return `card py-3 mb-3 color-${index % 2 === 0 ? "2" : "1"} day ${
      activeDay === day ? "active" : ""
    }`;
  };

  const handleAddMeal = () => {
    setMeals((prevMeals) => {
      const existingMeals = prevMeals[activeDay] || {};
      const category = ["Breakfast", "Lunch", "Dinner", "Snacks"][showAddMeal];
      return {
        ...prevMeals,
        [activeDay]: {
          ...existingMeals,
          [category]: [
            ...(existingMeals[category] || []),
            { ...newMeal, id: Date.now() },
          ],
        },
      };
    });

    setNewMeal({ name: "", weight: "" });
    setShowAddMeal(false);
  };

  const handleEditMeal = (category, mealIndex, meal) => {
    setEditingMealIndex({ category, mealIndex });
    setEditedMeal({ ...meal });
  };

  const handleSaveEditMeal = () => {
    setMeals((prevMeals) => {
      const updatedMeals = { ...prevMeals[activeDay] };
      const { category, mealIndex } = editingMealIndex;

      updatedMeals[category][mealIndex] = editedMeal;

      return {
        ...prevMeals,
        [activeDay]: updatedMeals,
      };
    });

    setEditingMealIndex(null);
    setEditedMeal({ name: "", weight: "" });
  };

  const handleCancelEditMeal = () => {
    setEditingMealIndex(null);
    setEditedMeal({ name: "", weight: "" });
  };

  const handleRemoveMeal = (category, mealIndex) => {
    setMeals((prevMeals) => {
      const updatedMeals = { ...prevMeals[activeDay] };
      updatedMeals[category].splice(mealIndex, 1);

      return {
        ...prevMeals,
        [activeDay]: updatedMeals,
      };
    });
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
                <h1 className="title ms-md-3">Nutritional Schedule</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <div className="row align-items-stretch ms-md-5">
            <div className="col-xl-4 mt-3">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Tursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <div
                  key={day}
                  className={getCardClassName(day, index)}
                  onClick={() => setActiveDay(day)}
                >
                  <div className="card-body">
                    <h4 className="mb-0 ms-4">{day}</h4>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-xl-8 my-3">
              {!activeDay ? (
                <div className="card h-100">
                  <div className="card-body d-flex align-items-center">
                    <div className="w-100 text-center">
                      <h3>Select a day to view the meal plan</h3>
                      <h3>
                        Press <i class="fa-solid fa-plus"></i> to add meals for
                        breakfast, lunch or dinner
                      </h3>
                      <h3>For each meal:</h3>
                      <h3>
                        Press <i class="fa-solid fa-pen-to-square"></i> to edit
                      </h3>
                      <h3>
                        Press <i class="fa-solid fa-trash"></i> to delete
                      </h3>
                      <h3>
                        Press <i class="fa-solid fa-floppy-disk"></i> to save
                      </h3>
                      <h3>
                        Press <i class="fa-solid fa-xmark"></i> to cancel
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="card">
                    <div className="card-header d-flex justify-content-between">
                      <h3 className="mb-0 fw-bold">
                        Meal plan for {activeDay}
                      </h3>
                    </div>
                  </div>
                  {["Breakfast", "Lunch", "Dinner", "Snacks"].map(
                    (category, index) => (
                      <div className="card my-3" key={index}>
                        <div className="card-header d-flex">
                          <h4 className="mb-0 me-auto">{category}</h4>
                          <i
                            className="fa-solid fa-plus d-flex align-items-center fs-3"
                            onClick={() => setShowAddMeal(index)}
                          ></i>
                        </div>
                        <div className="card-body">
                          {showAddMeal === index && (
                            <div className="card">
                              <div className="card-header">
                                <h4 className="mb-0">New meal:</h4>
                              </div>
                              <div className="card-body">
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="Meal"
                                  maxLength={50}
                                  value={newMeal.name}
                                  onChange={(e) =>
                                    setNewMeal((prev) => ({
                                      ...prev,
                                      name: e.target.value,
                                    }))
                                  }
                                  required
                                />
                                <div className="d-md-flex mt-2">
                                  <input
                                    className="me-auto form-control"
                                    type="number"
                                    placeholder="Weight"
                                    maxLength={5}
                                    value={newMeal.weight}
                                    onChange={(e) =>
                                      setNewMeal((prev) => ({
                                        ...prev,
                                        weight: e.target.value,
                                      }))
                                    }
                                    required
                                  />
                                  <div className="d-flex mt-2 mt-md-0">
                                    <i
                                      className="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
                                      onClick={handleAddMeal}
                                    ></i>
                                    <i
                                      className="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
                                      onClick={() => setShowAddMeal(false)}
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {meals[activeDay] &&
                            meals[activeDay][category] &&
                            meals[activeDay][category].map(
                              (meal, mealIndex) => (
                                <div key={meal.id} className="mt-3">
                                  {editingMealIndex &&
                                  editingMealIndex.category === category &&
                                  editingMealIndex.mealIndex === mealIndex ? (
                                    <>
                                      <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Meal"
                                        maxLength={50}
                                        value={editedMeal.name}
                                        onChange={(e) =>
                                          setEditedMeal({
                                            ...editedMeal,
                                            name: e.target.value,
                                          })
                                        }
                                        required
                                      />
                                      <div className="d-flex mt-2">
                                        <input
                                          className="form-control me-auto"
                                          type="number"
                                          placeholder="Weight"
                                          maxLength={5}
                                          value={editedMeal.weight}
                                          onChange={(e) =>
                                            setEditedMeal({
                                              ...editedMeal,
                                              weight: e.target.value,
                                            })
                                          }
                                          required
                                        />
                                        <i
                                          className="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
                                          onClick={handleSaveEditMeal}
                                        ></i>
                                        <i
                                          className="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
                                          onClick={handleCancelEditMeal}
                                        ></i>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="d-flex">
                                      <h4 className="mb-0 me-auto">
                                        {meal.name} - {meal.weight}g
                                      </h4>
                                      <i
                                        className="fa-solid fa-pen-to-square d-flex align-items-center fs-3 me-1"
                                        onClick={() =>
                                          handleEditMeal(
                                            category,
                                            mealIndex,
                                            meal
                                          )
                                        }
                                      ></i>
                                      <i
                                        className="fa-solid fa-trash d-flex align-items-center fs-3 ms-1"
                                        onClick={() =>
                                          handleRemoveMeal(category, mealIndex)
                                        }
                                      ></i>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
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

export default Nutrition;
