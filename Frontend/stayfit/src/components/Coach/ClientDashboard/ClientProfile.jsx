import React from "react";
import TextField from "@mui/material/TextField";

function ClientProfile({ client }) {
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="col-xl-4 mt-3">
      <div className="card profile">
        <div className="card-header">
          <h4 className="text-center mb-0">Profile</h4>
        </div>
        <div className="card-body">
          <div className="text-center">
            <img
              src={
                client.profilePicture
                  ? `data:image/jpeg;base64,${client.profilePicture}`
                  : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
              }
            />
          </div>
          <div className="text-center mt-1 mb-1">
            <h3 className="mb-0">{client.firstName}</h3>
            <h3 className="mb-0">{client.lastName}</h3>
          </div>
          <div className="mt-2">
            <TextField
              className="w-100"
              label="Age"
              variant="outlined"
              size="small"
              value={
                client.dateOfBirth
                  ? `${calculateAge(client.dateOfBirth)} years`
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
              label="Email"
              variant="outlined"
              size="small"
              value={client.email ? `${client.email}` : `Not available`}
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
              label="Phone"
              variant="outlined"
              size="small"
              value={client.phone ? `${client.phone}` : `Not available`}
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
  );
}

export default ClientProfile;
