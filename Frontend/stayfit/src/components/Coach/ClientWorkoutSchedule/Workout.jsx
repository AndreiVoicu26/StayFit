import React from "react";
import axios from "axios";
import API_URL from "../../../config";

function Workout({
  clientId,
  workoutElement,
  setWorkout,
  setShowAddExercise,
  setEditingWorkoutIndex,
  fetchWorkouts,
  workoutIndex,
}) {
  const handleRemoveWorkout = async (workoutId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/v1/coach/client/${clientId}/workout/${workoutId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchWorkouts();
        console.log("Workout removed successfully");
      }
    } catch (error) {
      console.log("Error removing workout: ", error);
    }
  };

  return (
    <div className="d-flex">
      <h4 className="mb-0 me-auto fw-bold">{workoutElement.name}</h4>
      <i
        class="fa-solid fa-square-plus d-flex align-items-center fs-3 me-2 mt-1"
        onClick={() => {
          setShowAddExercise((prev) => ({
            ...prev,
            [workoutIndex]: true,
          }));
        }}
      ></i>
      <i
        class="fa-solid fa-pen-to-square d-flex align-items-center fs-3 ms-2 me-1"
        onClick={() => {
          setEditingWorkoutIndex(workoutIndex);
          setWorkout(workoutElement);
        }}
      ></i>
      <i
        class="fa-solid fa-trash d-flex align-items-center fs-3 ms-1"
        onClick={() => handleRemoveWorkout(workoutElement.id)}
      ></i>
    </div>
  );
}

export default Workout;
