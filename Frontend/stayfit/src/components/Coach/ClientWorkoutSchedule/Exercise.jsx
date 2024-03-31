import React from "react";
import { isValidURL } from "../../Utils/ValidURLCheck";
import axios from "axios";

function Exercise({
  clientId,
  workoutElement,
  exerciseElement,
  setExercise,
  editingExerciseIndex,
  setEditingExerciseIndex,
  fetchWorkouts,
  workoutIndex,
  exerciseIndex,
}) {
  const handleRemoveExercise = async (workoutId, exerciseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/coach/client/${clientId}/workout/${workoutId}/exercise/${exerciseId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchWorkouts();
        console.log("Exercise removed successfully");
      }
    } catch (error) {
      console.log("Error removing exercise: ", error);
    }
  };

  const handleRedirectToLink = (link) => {
    window.location.href = link;
  };

  return (
    <div>
      <div className="d-flex">
        <div className="d-flex me-auto">
          <h4 className="mb-0">{exerciseElement.name}</h4>
          {exerciseElement.link && isValidURL(exerciseElement.link) && (
            <i
              class="fa-solid fa-arrow-up-right-from-square d-flex align-items-center fs-4 mx-3"
              onClick={() => handleRedirectToLink(exerciseElement.link)}
            ></i>
          )}
        </div>
        <div className="d-flex">
          <i
            class="fa-solid fa-pen-to-square d-flex align-items-center fs-3 me-1"
            onClick={() => {
              setEditingExerciseIndex({
                ...editingExerciseIndex,
                workoutIndex: workoutIndex,
                exerciseIndex: exerciseIndex,
              });
              setExercise(exerciseElement);
            }}
          ></i>
          <i
            class="fa-solid fa-trash d-flex align-items-center fs-3 ms-1"
            onClick={() =>
              handleRemoveExercise(workoutElement.id, exerciseElement.id)
            }
          ></i>
        </div>
      </div>
      <div className="d-flex">
        <h4 className="mb-0 me-3">{exerciseElement.details}</h4>
      </div>
    </div>
  );
}

export default Exercise;
