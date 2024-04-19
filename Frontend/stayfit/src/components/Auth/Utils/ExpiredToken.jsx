import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import axios from "axios";

function ExpiredToken() {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/refresh-token",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        switch (role) {
          case "CUSTOMER":
            navigate("/dashboard");
            break;
          case "COACH":
            navigate("/clients");
            break;
          case "SYS_ADMIN":
            navigate("/management");
            break;
        }
      }
    } catch (error) {
      logout();
      console.error("Error refreshing token:", error);
    }
  };

  return (
    <div class="login-card">
      <h3 className="mb-3 text-center">Your session will expire soon</h3>
      <h4 className="mb-3 text-center" style={{ color: "white" }}>
        Do you want to stay logged in?
      </h4>
      <button
        className="form-control btn btn-primary px-3 mb-3"
        onClick={() => refreshToken()}
      >
        Yes
      </button>
      <button
        className="form-control btn btn-primary px-3 mb-5"
        onClick={() => logout()}
      >
        No
      </button>
    </div>
  );
}

export default ExpiredToken;
