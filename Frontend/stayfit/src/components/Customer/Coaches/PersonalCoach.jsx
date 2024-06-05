import React from "react";
import axios from "axios";
import API_URL from "../../../config";

function PersonalCoach({ personalCoach, fetchPersonalCoach }) {
  const handleRemoveCoach = async () => {
    try {
      const response = await axios.delete(`${API_URL}/api/v1/customer/coach`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Coach deleted successfully");
        fetchPersonalCoach();
      }
    } catch (error) {
      console.error("Error deleting coach", error);
    }
  };

  return (
    <div className="row ms-md-5">
      <div className="col-xl-12 mt-3">
        <div className="card">
          <div className="card-header">
            <h3 className="mb-0">
              Your coach is {personalCoach.firstName} {personalCoach.lastName}
            </h3>
          </div>
          <div className="card-body">
            <h5 className="mb-0 top d-flex">
              Press <i class="fa fa-minus mx-2"></i> to cancel the partnership.
            </h5>
          </div>
        </div>
      </div>
      <div className="col-xl-12 mt-3">
        <div className="card">
          <header>
            <div class="img profile">
              <img
                src={
                  personalCoach.profilePicture
                    ? `data:image/jpeg;base64,${personalCoach.profilePicture}`
                    : "images/user.png"
                }
                alt="Profile Picture"
              />
            </div>
          </header>
          <h3 className="name">
            {personalCoach.firstName} {personalCoach.lastName}
          </h3>
          <h5 className="role">{personalCoach.qualification}</h5>
          <hr className="w-50 mx-auto mt-1" />
          {personalCoach.description && (
            <>
              <div className="description">
                <p>{personalCoach.description}</p>
              </div>
              <hr className="w-50 mx-auto mt-1" />
            </>
          )}
          <h6 className="text-center">Email: {personalCoach.email}</h6>
          <h6 className="text-center mb-3">
            Phone: {personalCoach.phone ? personalCoach.phone : "Not available"}
          </h6>
          <div class="text-center choose">
            <a href="" onClick={() => handleRemoveCoach()}>
              <i class="fa fa-minus"></i>
            </a>
          </div>
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
    </div>
  );
}

export default PersonalCoach;
