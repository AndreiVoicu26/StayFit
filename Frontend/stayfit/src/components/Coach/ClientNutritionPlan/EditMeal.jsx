import React from "react";
import axios from "axios";
import API_URL from "../../../config";

function EditMeal({
  clientId,
  meal,
  setMeal,
  setEditingMealIndex,
  mealElement,
  fetchMeals,
}) {
  const handleEditMeal = async (mealId) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/coach/client/${clientId}/meal/${mealId}`,
        meal,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchMeals();
        console.log("Meal updated successfully");
      }
    } catch (error) {
      console.log("Error updating meal: ", error);
    }

    setMeal("");
    setEditingMealIndex(null);
  };

  return (
    <div>
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
          })
        }
        required
      />
      <div className="d-flex mt-2">
        <input
          className="form-control me-auto"
          type="text"
          placeholder="Details"
          maxLength={50}
          value={meal.details}
          onChange={(e) =>
            setMeal({
              ...meal,
              details: e.target.value,
            })
          }
          required
        />
        <i
          className="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
          onClick={() => {
            if (meal.name) {
              handleEditMeal(mealElement.id);
            }
          }}
        ></i>
        <i
          className="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
          onClick={() => {
            setEditingMealIndex(null);
            setMeal("");
          }}
        ></i>
      </div>
    </div>
  );
}

export default EditMeal;
