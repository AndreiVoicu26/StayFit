import React from "react";

function Goals({ profile }) {
  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="mb-0">Your Goals</h5>
      </div>
      <div className="card-body mb-3">
        <h5 className="mt-2">
          Target Weight:{" "}
          {profile.targetWeight
            ? profile.targetWeight + " kg"
            : "Not available"}
        </h5>
        <hr className="mb-4 mt-4" />
        <h5>
          Target Workout:{" "}
          {profile.targetWorkout
            ? profile.targetWorkout + " min"
            : "Not available"}
        </h5>
        <hr className="mb-4 mt-4" />
        <h5 className="mb-1">
          Target Calories:{" "}
          {profile.targetCalories
            ? profile.targetCalories + " cal"
            : "Not available"}
        </h5>
      </div>
    </div>
  );
}

export default Goals;
