import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuth } from "./AuthProvider.jsx";
import axios from "axios";

function Register() {
  const [isFormValid, setIsFormValid] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const { authenticated, register, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkEmail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/auth/check-email?email=${formData.email}`
      );
      if (!response.data.isEmailAvailable) {
        setIsFormValid(false);
        let error = {};
        error.email = "Email already in use";
        setFormErrors(error);
      } else {
        setIsFormValid(true);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const checkUsername = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/auth/check-username?username=${formData.username}`
      );
      if (!response.data.isUsernameAvailable) {
        setIsFormValid(false);
        let error = {};
        error.username = "Username already in use";
        setFormErrors(error);
      } else {
        setIsFormValid(true);
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (formData.firstName == "") {
      isValid = false;
      errors.firstName = "First name is required";
    } else {
      if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
        isValid = false;
        errors.firstName = "Name must contain only letters";
      }
    }

    if (formData.lastName == "") {
      isValid = false;
      errors.lastName = "Last name is required";
    } else {
      if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
        isValid = false;
        errors.lastName = "Name must contain only letters";
      }
    }

    if (formData.email == "") {
      isValid = false;
      errors.email = "Email is required";
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        isValid = false;
        errors.email = "Email not valid";
      } else {
        checkEmail();
      }
    }

    if (formData.username == "") {
      isValid = false;
      errors.username = "Username is required";
    } else {
      if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
        isValid = false;
        errors.username = "Username must contain only letters and numbers";
      } else {
        checkUsername();
      }
    }

    if (formData.password == "") {
      isValid = false;
      errors.password = "Password is required";
    } else {
      if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(formData.password)) {
        isValid = false;
        errors.password =
          "Password must contain at least 8 characters, letters and numbers";
      }
    }
    setFormErrors(errors);
    return isValid;
  };

  const box_style = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 530,
    bgcolor: "#f4f6f6",
    boxShadow: 24,
    p: 5,
    borderRadius: "40px",
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
              <h2 className="heading">Register</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              {authenticated ? (
                <div class="login-card">
                  <h3 className="mb-3 text-center">
                    You are already logged in
                  </h3>
                  <Button
                    className="form-control btn btn-primary px-3"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Log out
                  </Button>
                  <h3 className="text-center mt-3">or</h3>
                  <Button
                    className="form-control btn btn-primary px-3 mb-5"
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="login-card pb-0">
                  <h3 className="mb-3 text-center">Create your account</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(true);
                      validate();
                      if (validate() && isFormValid) {
                        register(formData);
                      }
                    }}
                  >
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
                      />
                    </div>
                    <div className="mb-3">
                      <TextField
                        id="password-field"
                        type="password"
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
                      />
                      <i
                        toggle="#password-field"
                        className="fa-solid fa-eye toggle-password pass-icon-register"
                      ></i>
                    </div>
                    <div className="mb-3">
                      <button
                        type="submit"
                        className="form-control btn btn-primary submit px-3"
                      >
                        Register
                      </button>
                    </div>
                    <div className="mb-3 d-md-flex">
                      <div className="w-50 form-check ms-2">
                        <input class="form-check-input" type="checkbox" />
                        <label class="form-check-label">Remember Me</label>
                      </div>
                    </div>
                  </form>
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
    </div>
  );
}

export default Register;
