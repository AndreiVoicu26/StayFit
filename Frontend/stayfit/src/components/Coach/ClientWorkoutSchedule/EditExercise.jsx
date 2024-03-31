import React from "react";
import { isValidURL } from "../../Utils/ValidURLCheck";
import axios from "axios";

function EditExercise({
  clientId,
  workoutElement,
  exerciseElement,
  exercise,
  setExercise,
  setEditingExerciseIndex,
  fetchWorkouts,
}) {
  const handleEditExercise = async (workoutId, exerciseId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/coach/client/${clientId}/workout/${workoutId}/exercise/${exerciseId}`,
        exercise,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchWorkouts();
        console.log("Exercise updated successfully");
      }
    } catch (error) {
      console.log("Error updating exercise: ", error);
    }

    setExercise("");
    setEditingExerciseIndex({});
  };

  return (
    <div>
      <input
        className="form-control"
        placeholder="Exercise Name"
        type="text"
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
        type="url"
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
                handleEditExercise(workoutElement.id, exerciseElement.id);
              }
            }}
          ></i>
          <i
            class="fa-solid fa-xmark d-flex align-items-center fs-3 ms-1"
            onClick={() => {
              setEditingExerciseIndex({});
              setExercise("");
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default EditExercise;
