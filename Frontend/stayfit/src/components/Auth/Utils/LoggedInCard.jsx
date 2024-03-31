import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";

function LoggedInCard() {
  const { logout, role } = useAuth();
  const navigate = useNavigate();

  return (
    <div class="login-card">
      <h3 className="mb-3 text-center">You are already logged in</h3>
      <button
        className="form-control btn btn-primary px-3"
        onClick={() => logout()}
      >
        Log out
      </button>
      <h3 className="text-center mt-3">or</h3>
      <button
        className="form-control btn btn-primary px-3 mb-5"
        onClick={() => {
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
        }}
      >
        Go to your account
      </button>
    </div>
  );
}

export default LoggedInCard;
