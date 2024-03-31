import { React, useState, useEffect } from "react";
import axios from "axios";

function CoachInfo() {
  const [coachInfo, setCoachInfo] = useState({
    description: "",
    qualification: "",
  });

  const handleUpdateCoachInfo = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/coach/info",
        coachInfo,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Coach info updated successfully");
      }
    } catch (error) {
      console.log("Error updating coach info: ", error);
    }
  };

  const fetchCoachInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/coach/info",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCoachInfo(response.data);
      }
    } catch (error) {
      console.log("Error fetching coach info: ", error);
    }
  };

  useEffect(() => {
    fetchCoachInfo();
  }, []);

  return (
    <div class="row align-items-center ms-md-5">
      <div class="col-xl-12">
        <div class="card mt-2">
          <div class="card-header">
            <h5 className="mb-0">Coach Details</h5>
          </div>
          <div class="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault(true);
                handleUpdateCoachInfo();
              }}
            >
              <div class="mb-3">
                <label for="description" class="form-label">
                  Qualification
                </label>
                <input
                  type="text"
                  class="form-control mb-3"
                  value={coachInfo.qualification}
                  onChange={(e) =>
                    setCoachInfo({
                      ...coachInfo,
                      qualification: e.target.value,
                    })
                  }
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  class="form-control mb-3"
                  value={coachInfo.description}
                  onChange={(e) =>
                    setCoachInfo({ ...coachInfo, description: e.target.value })
                  }
                />
              </div>
              <button class="btn btn-primary" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachInfo;
