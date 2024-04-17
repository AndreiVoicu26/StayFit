import React from "react";
import { isValidURL } from "../../Utils/ValidURLCheck";

function Workout({ workoutElement, workoutIndex }) {
  const handleRedirectToLink = (link) => {
    window.location.href = link;
  };

  return (
    <div className="card mt-3" key={workoutIndex}>
      <div className="card-header">
        <h4 className="mb-0 me-auto fw-bold">{workoutElement.name}</h4>
      </div>
      <div className="card-body">
        {workoutElement.exercises &&
          workoutElement.exercises.map((exerciseElement, exerciseIndex) => (
            <div key={exerciseIndex} className="d-flex">
              <h4 className="mb-0">{exerciseElement.name}</h4>
              {exerciseElement.link && isValidURL(exerciseElement.link) && (
                <i
                  class="fa-solid fa-arrow-up-right-from-square align-items-center fs-4 ms-3 mt-1"
                  onClick={() => handleRedirectToLink(exerciseElement.link)}
                ></i>
              )}
              <h4 className="mb-0 mx-3 text-muted">
                {exerciseElement.details && "|"}
              </h4>
              <h4 className="mb-0">{exerciseElement.details}</h4>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Workout;
