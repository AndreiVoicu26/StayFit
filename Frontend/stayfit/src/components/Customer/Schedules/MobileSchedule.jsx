import React from "react";

function MobileSchedule({ activeDay, setActiveDay }) {
  const getClassName = (day) => {
    return `dropdown-item day ${activeDay === day ? "active" : ""}`;
  };

  return (
    <div class="dropdown-center mt-3">
      <button
        class="btn dropdown-toggle card py-3 mb-3 w-100 align-items-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          backgroundColor: "white",
          color: "#1c2938",
          border: "none",
        }}
      >
        <h4 className="mb-0">{!activeDay ? "Days" : activeDay}</h4>
      </button>
      <ul
        className="dropdown-menu p-2 w-75"
        style={{
          border: "none",
        }}
      >
        <li>
          <hr class="dropdown-divider" />
        </li>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day, index) => (
          <>
            <li key={index} className="text-center">
              <a
                class={getClassName(day)}
                style={{
                  cursor: "pointer",
                  boxShadow: "none",
                  borderRadius: "20px",
                  color: "black",
                }}
                onClick={() => setActiveDay(day)}
              >
                {day}
              </a>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default MobileSchedule;
