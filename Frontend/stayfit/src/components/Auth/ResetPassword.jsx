import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handlePasswordReset = async (e) => {
    let body = { password, token };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/reset-password",
        body,
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate("/login");
        console.log("Password reset successfully");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const validate = () => {
    let isValid = true;

    if (password == "") {
      isValid = false;
      setError("Password is required");
    } else {
      if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password)) {
        isValid = false;
        setError(
          "Password must contain at least 8 characters, letters and numbers"
        );
      }
    }
    return isValid;
  };

  const form_control = {
    width: "100%",
    ".MuiInputBase-input": {
      color: "white",
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "40px",
      height: "40px",
      padding: "5px 20px",
    },
    ".MuiOutlinedInput-root": {
      borderRadius: "40px",
      "& fieldset": {
        color: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
    },
  };

  return (
    <div>
      <div
        className="img js-fullheight auth"
        style={{
          backgroundImage: `url(${"https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"})`,
        }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-4">
              <h2 className="heading">Reset Password</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-card pb-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault(true);
                    validate();
                    if (validate()) {
                      handlePasswordReset();
                    }
                  }}
                >
                  <div className="mb-3">
                    <TextField
                      id="password-field"
                      type="password"
                      sx={form_control}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setError(null);
                        setPassword(e.target.value);
                      }}
                      error={error}
                      label={error}
                      InputLabelProps={{
                        sx: {
                          fontSize: "1rem",
                        },
                      }}
                    />
                    <i
                      toggle="#password-field"
                      className="fa-solid fa-eye toggle-password pass-icon-login"
                    ></i>
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="form-control btn btn-primary submit px-3"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
