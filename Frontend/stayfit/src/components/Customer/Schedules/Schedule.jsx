import React from "react";

function Schedule({ activeDay, setActiveDay }) {
  const getClassName = (day) => {
    return `mb-0 ms-lg-1 me-lg-1 ms-xl-3 me-xl-3 day ${
      activeDay === day ? "active" : ""
    }`;
  };

  return (
    <div className="col-xl-12 mt-3">
      <div className="card align-items-center">
        <div className="card-body d-flex">
          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day, index) => (
            <div
              key={day}
              className={getClassName(day)}
              style={{
                cursor: "pointer",
                borderRadius: "20px",
              }}
              onClick={() => setActiveDay(day)}
            >
              <h4 className="mb-0 px-2 py-1">{day}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
