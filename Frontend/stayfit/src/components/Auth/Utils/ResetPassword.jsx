import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    validate();
    if (validate()) {
      let body = { password, token };
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/reset-password",
          body,
          { withCredentials: true }
        );
        if (response.status === 200) {
          navigate("/login");
          alert("Password reset successfully");
          console.log("Password reset successfully");
        }
      } catch (error) {
        setInvalidToken(true);
        console.error("Error resetting password:", error);
      }
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
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "40px",
    width: "100%",
    ".MuiInputBase-input": {
      color: "white",
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
    <div className="img js-fullheight auth">
      <div className="overlay"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6 text-center mb-4">
            <h2 className="heading">Reset Password</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-11">
            {invalidToken ? (
              <div class="login-card pb-5">
                <h3 className="mb-3 text-center">Invalid request</h3>
                <button
                  className="form-control btn btn-primary px-3"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <div className="login-card pb-5">
                <form onSubmit={(e) => handlePasswordReset(e)}>
                  <div className="mb-3">
                    <TextField
                      id="password-field"
                      type={visible ? "text" : "password"}
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
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            style={{ color: "white" }}
                            onClick={() => setVisible(!visible)}
                          >
                            {visible ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
