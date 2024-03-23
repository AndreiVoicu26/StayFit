import React, { useState, useEffect } from "react";
import axios from "axios";

function Meal({
  clientId,
  mealElement,
  setMeal,
  setEditingMealIndex,
  fetchMeals,
  mealIndex,
  mealType,
}) {
  const handleRemoveMeal = async (mealId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/coach/client/${clientId}/meal/${mealId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchMeals();
        console.log("Meal removed successfully");
      }
    } catch (error) {
      console.log("Error removing meal: ", error);
    }
  };

  return (
    <div>
      <div className="d-flex">
        <h4 className="mb-0 me-auto">{mealElement.name}</h4>
        <i
          className="fa-solid fa-pen-to-square d-flex align-items-center fs-3 me-1"
          onClick={() => {
            setEditingMealIndex({ mealType, mealIndex });
            setMeal(mealElement);
            console.log("Editing meal: ", mealElement, mealIndex);
          }}
        ></i>
        <i
          className="fa-solid fa-trash d-flex align-items-center fs-3 ms-1"
          onClick={() => handleRemoveMeal(mealElement.id)}
        ></i>
      </div>
      <h4>{mealElement.details}</h4>
    </div>
  );
}

export default Meal;
