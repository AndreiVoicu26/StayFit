import React, { useState, useEffect } from "react";
import axios from "axios";

function AddMeal({
  clientId,
  activeDay,
  mealType,
  meal,
  setMeal,
  setShowAddMeal,
  fetchMeals,
}) {
  const handleAddMeal = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/coach/client/${clientId}/meal`,
        meal,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchMeals();
        console.log("Meal added successfully");
      }
    } catch (error) {
      console.log("Error adding meal: ", error);
    }

    setMeal("");
    setShowAddMeal(false);
  };

  return (
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
          value={meal.name}
          onChange={(e) =>
            setMeal({
              ...meal,
              name: e.target.value,
              dayOfWeek: activeDay.toUpperCase(),
              mealType: mealType.toUpperCase(),
            })
          }
          required
        />
        <div className="d-md-flex mt-2">
          <input
            className="me-auto form-control"
            type="text"
            placeholder="Details"
            maxLength={50}
            value={meal.details}
            onChange={(e) =>
              setMeal({
                ...meal,
                details: e.target.value,
                dayOfWeek: activeDay.toUpperCase(),
                mealType: mealType.toUpperCase(),
              })
            }
            required
          />
          <div className="d-flex mt-2 mt-md-0">
            <i
              className="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
              onClick={() => {
                if (meal.name) {
                  handleAddMeal();
                }
              }}
            ></i>
            <i
              className="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
              onClick={() => setShowAddMeal(false)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMeal;
