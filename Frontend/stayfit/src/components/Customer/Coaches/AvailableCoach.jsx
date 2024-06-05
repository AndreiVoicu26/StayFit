import React from "react";
import axios from "axios";
import API_URL from "../../../config";

function AvailableCoach({ personalCoach, coach, fetchPersonalCoach }) {
  const handleChooseCoach = async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/customer/coaches/${id}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Coach chosen successfully");
        fetchPersonalCoach();
      }
    } catch (error) {
      console.error("Error choosing coach", error);
    }
  };

  return (
    <div className="col-xl-4 mt-3 mb-3" key={coach.id}>
      <div className="card">
        <header>
          <div className="img profile">
            <img
              src={
                coach.profilePicture
                  ? `data:image/jpeg;base64,${coach.profilePicture}`
                  : "images/user.png"
              }
              alt="Profile Picture"
            />
          </div>
        </header>
        <h3 className="name">
          {coach.firstName} {coach.lastName}
        </h3>
        <h5 className="role">{coach.qualification}</h5>
        <hr className="w-50 mx-auto mt-1" />
        {coach.description && (
          <>
            <div className="description">
              <p>{coach.description}</p>
            </div>
            <hr className="w-50 mx-auto mt-1" />
          </>
        )}
        <h6 className="text-center">Email: {coach.email}</h6>
        <h6 className="text-center mb-3">
          Phone: {coach.phone ? coach.phone : "Not available"}
        </h6>
        {!personalCoach && (
          <div className="text-center choose">
            <a href="" onClick={() => handleChooseCoach(coach.id)}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
        )}
        <footer className="mt-4">
          <a href="">
            <i class="fa fa-whatsapp"></i>
          </a>
          <a href="">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="">
            <i class="fa fa-instagram"></i>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default AvailableCoach;
