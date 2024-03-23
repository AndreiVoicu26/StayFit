import React from "react";
import axios from "axios";

function AddWorkout({
  clientId,
  activeDay,
  workout,
  setWorkout,
  setShowAddWorkout,
  fetchWorkouts,
}) {
  const handleAddWorkout = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/coach/client/${clientId}/workout`,
        workout,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchWorkouts();
        console.log("Workout added successfully");
      }
    } catch (error) {
      console.log("Error adding workout: ", error);
    }

    setWorkout("");
    setShowAddWorkout(false);
  };

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h4 className="mb-0">New workout:</h4>
      </div>
      <div className="card-body d-flex">
        <input
          className="me-auto form-control"
          type="text"
          value={workout.name}
          maxLength={25}
          onChange={(e) =>
            setWorkout({
              ...workout,
              name: e.target.value,
              dayOfWeek: activeDay.toUpperCase(),
            })
          }
          required
        />
        <i
          class="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
          onClick={() => {
            if (workout.name) {
              handleAddWorkout();
            }
          }}
        ></i>
        <i
          class="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
          onClick={() => setShowAddWorkout(false)}
        ></i>
      </div>
    </div>
  );
}

export default AddWorkout;
