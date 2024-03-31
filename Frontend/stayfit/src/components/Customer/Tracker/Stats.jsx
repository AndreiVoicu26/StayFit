import React from "react";
import axios from "axios";

function Stats({ record, setRecord, fetchRecords }) {
  const handleSaveRecord = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/customer/record",
        record,
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchRecords();
        console.log("Record saved successfully");
      }
    } catch (error) {
      console.log("Error saving record:", error);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-header text-center">
        <h5 className="mb-0">Your Stats</h5>
      </div>
      <div className="card-body">
        <form
          className="form"
          onSubmit={(e) => {
            handleSaveRecord(e);
          }}
        >
          <div className="mt-1">
            <h5>Calories consumed:</h5>
            <input
              type="number"
              className="form-control"
              placeholder="kcal"
              required
              value={record.calories}
              onChange={(e) =>
                setRecord({
                  ...record,
                  calories: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-3">
            <h5>Workout period: </h5>
            <input
              type="number"
              className="form-control"
              placeholder="min"
              required
              value={record.workout}
              onChange={(e) =>
                setRecord({
                  ...record,
                  workout: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-3">
            <h5>Weight: </h5>
            <input
              type="number"
              className="form-control"
              placeholder="kg"
              required
              value={record.weight}
              onChange={(e) =>
                setRecord({
                  ...record,
                  weight: e.target.value,
                })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default Stats;
