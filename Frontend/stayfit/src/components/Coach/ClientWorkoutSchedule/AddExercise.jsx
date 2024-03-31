import React from "react";
import { isValidURL } from "../../Utils/ValidURLCheck";
import axios from "axios";

function AddExercise({
  clientId,
  workoutElement,
  exercise,
  setExercise,
  setShowAddExercise,
  fetchWorkouts,
  workoutIndex,
}) {
  const handleAddExercise = async (workoutId, workoutIndex) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/coach/client/${clientId}/workout/${workoutId}/exercise`,
        exercise,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchWorkouts();
        console.log("Exercise added successfully");
      }
    } catch (error) {
      console.log("Error adding exercise: ", error);
    }

    setExercise("");
    setShowAddExercise((prev) => ({
      ...prev,
      [workoutIndex]: false,
    }));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="mb-0">New exercise:</h4>
      </div>
      <div className="card-body">
        <input
          type="text"
          className="form-control"
          placeholder="Exercise Name"
          value={exercise.name}
          maxLength={50}
          onChange={(e) =>
            setExercise({
              ...exercise,
              name: e.target.value,
            })
          }
          required
        />
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Exercise Link"
          value={exercise.link}
          onChange={(e) =>
            setExercise({
              ...exercise,
              link: e.target.value,
            })
          }
        />
        <div className="d-md-flex mt-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Exercise Details"
            value={exercise.details}
            onChange={(e) =>
              setExercise({
                ...exercise,
                details: e.target.value,
              })
            }
          />
          <div className="d-flex ms-auto mt-2 mt-md-auto">
            <i
              class="fa-solid fa-floppy-disk d-flex align-items-center fs-3 me-1"
              onClick={() => {
                if (!isValidURL(exercise.link)) {
                  setExercise({
                    ...exercise,
                    link: "",
                  });
                }
                if (exercise.name) {
                  handleAddExercise(workoutElement.id, workoutIndex);
                }
              }}
            ></i>
            <i
              class="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
              onClick={() =>
                setShowAddExercise((prev) => ({
                  ...prev,
                  [workoutIndex]: false,
                }))
              }
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExercise;
