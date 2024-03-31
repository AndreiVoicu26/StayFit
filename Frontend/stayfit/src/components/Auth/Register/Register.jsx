import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoggedInCard from "../Utils/LoggedInCard";
import { validate } from "./RegisterValidator";
import { useAuth } from "../AuthProvider.jsx";

function Register() {
  const [isFormValid, setIsFormValid] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const { authenticated, register, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    validate(formData, setFormErrors, setIsFormValid);
    if (validate(formData, setFormErrors, setIsFormValid) && isFormValid) {
      register(formData);
    }
  };

  const form_control = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
          <div className="text-center mb-4">
            <h2 className="heading">Register</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-11">
            {authenticated ? (
              <LoggedInCard />
            ) : (
              <div className="login-card pb-0">
                <h3 className="mb-3 text-center">Create your account</h3>
                <form onSubmit={(e) => handleRegister(e)}>
                  <div className="name-group d-flex">
                    <div className="mb-3 me-2">
                      <TextField
                        sx={form_control}
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => {
                          formErrors.firstName = null;
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          });
                        }}
                        error={formErrors.firstName}
                        label={formErrors.firstName}
                        InputLabelProps={{
                          sx: {
                            fontSize: "1rem",
                          },
                        }}
                      />
                    </div>
                    <div className="mb-3 ms-2">
                      <TextField
                        sx={form_control}
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => {
                          formErrors.lastName = null;
                          setFormData({
                            ...formData,
                            lastName: e.target.value,
                          });
                        }}
                        error={formErrors.lastName}
                        label={formErrors.lastName}
                        InputLabelProps={{
                          sx: {
                            fontSize: "1rem",
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <TextField
                      sx={form_control}
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => {
                        formErrors.email = null;
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        });
                      }}
                      error={formErrors.email}
                      label={formErrors.email}
                      InputLabelProps={{
                        sx: {
                          fontSize: "1rem",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      sx={form_control}
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => {
                        formErrors.username = null;
                        setFormData({
                          ...formData,
                          username: e.target.value,
                        });
                      }}
                      error={formErrors.username}
                      label={formErrors.username}
                      InputLabelProps={{
                        sx: {
                          fontSize: "1rem",
                        },
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <TextField
                      id="password-field"
                      type={visible ? "text" : "password"}
                      sx={form_control}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => {
                        formErrors.password = null;
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        });
                      }}
                      error={formErrors.password}
                      label={formErrors.password}
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
                      Register
                    </button>
                  </div>
                </form>
                <div className="mb-3 d-flex">
                  <div className="w-50 form-check mb-0 ms-2">
                    <input class="form-check-input" type="checkbox" />
                    <h6 class="form-check-label mb-0">Remember Me</h6>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="text-center">Already have an account ?</p>
                  <a href="/login" className="signup-link ms-3">
                    Sign In
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
