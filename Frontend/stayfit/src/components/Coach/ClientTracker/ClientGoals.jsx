import React from "react";
import axios from "axios";
import API_URL from "../../../config";

function ClientGoals({ clientId, target, setTarget, fetchClient }) {
  const handleSaveGoals = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${API_URL}/api/v1/coach/client/${clientId}/target`,
        target,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        fetchClient();
        console.log("Target saved successfully");
      }
    } catch (error) {
      console.error("Error saving target", error);
    }
  };

  return (
    <div className="col-xl-12 mt-3">
      <div className="card">
        <div className="card-header text-center">
          <h5 className="mb-0">Goals</h5>
        </div>
        <div className="card-body">
          <form
            className="form"
            onSubmit={(e) => {
              handleSaveGoals(e);
            }}
          >
            <div className="row">
              <div className="col-4">
                <h5>Weight:</h5>
                <input
                  type="number"
                  className="form-control"
                  placeholder="kg"
                  required
                  value={target.weight}
                  onChange={(e) => {
                    setTarget({ ...target, weight: e.target.value });
                  }}
                />
              </div>
              <div className="col-4">
                <h5>Workout:</h5>
                <input
                  type="number"
                  className="form-control"
                  placeholder="min"
                  required
                  value={target.workout}
                  onChange={(e) => {
                    setTarget({ ...target, workout: e.target.value });
                  }}
                />
              </div>
              <div className="col-4">
                <h5>Calories:</h5>
                <input
                  type="number"
                  className="form-control"
                  placeholder="kcal"
                  required
                  value={target.calories}
                  onChange={(e) => {
                    setTarget({ ...target, calories: e.target.value });
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3 ms-auto d-block"
              style={{ width: "100px" }}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientGoals;
