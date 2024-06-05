import React from "react";
import axios from "axios";
import API_URL from "../../../config";

function EditWorkout({
  clientId,
  workout,
  setWorkout,
  setEditingWorkoutIndex,
  workoutElement,
  fetchWorkouts,
}) {
  const handleEditWorkout = async (workoutId) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/v1/coach/client/${clientId}/workout/${workoutId}`,
        workout,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchWorkouts();
        console.log("Workout updated successfully");
      }
    } catch (error) {
      console.log("Error updating workout: ", error);
    }

    setWorkout("");
    setEditingWorkoutIndex(null);
  };

  return (
    <div className="d-flex">
      <input
        className="me-auto form-control"
        type="text"
        value={workout.name}
        maxLength={25}
        onChange={(e) =>
          setWorkout({
            ...workout,
            name: e.target.value,
          })
        }
        required
      />
      <i
        class="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
        onClick={() => {
          if (workout.name) {
            handleEditWorkout(workoutElement.id);
          }
        }}
      ></i>
      <i
        class="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
        onClick={() => {
          setEditingWorkoutIndex(null);
          setWorkout("");
        }}
      ></i>
    </div>
  );
}

export default EditWorkout;
