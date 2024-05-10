import React from "react";
import TextField from "@mui/material/TextField";

function Status({ profile }) {
  return (
    <div className="col-xl-4 mt-3">
      <div className="card profile">
        <div className="card-header">
          <h4 className="text-center mb-0">My Status</h4>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              src={
                profile.profilePicture
                  ? `data:image/jpeg;base64,${profile.profilePicture}`
                  : "images/user.png"
              }
            />
          </div>
          <div className="text-center mt-1 mb-1">
            <h3 className="mb-0">{profile.firstName}</h3>
            <h3 className="mb-0">{profile.lastName}</h3>
          </div>
          <div className="text-center">
            <hr className="m-0" />
            <h4 className="mb-1 mt-1">Today's Goals</h4>
            <hr className="m-0" />
            <div className="mt-3">
              <TextField
                className="w-100"
                label="Workout"
                variant="outlined"
                size="small"
                value={
                  profile.targetWorkout
                    ? `${profile.targetWorkout} minutes of workout`
                    : `Not available`
                }
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#cd3f3e" },
                }}
              />
            </div>
            <div className="mt-3">
              <TextField
                className="w-100"
                label="Nutrition"
                variant="outlined"
                size="small"
                value={
                  profile.targetCalories
                    ? `${profile.targetCalories} calories consumed`
                    : `Not available`
                }
                disabled
                sx={{
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "black",
                  },
                }}
                InputLabelProps={{
                  style: { color: "#cd3f3e" },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
