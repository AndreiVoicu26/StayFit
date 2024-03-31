import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoggedInCard from "../Utils/LoggedInCard";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import { validate } from "./LoginValidator";
import { useAuth } from "../AuthProvider";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [authUnsuccessful, setAuthUnsuccessful] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const { authenticated, login, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    validate(formData, setFormErrors);
    if (validate(formData, setFormErrors)) {
      login(formData).catch(() => {
        setAuthUnsuccessful(true);
        let errors = {};
        errors.username = "Username or password incorrect";
        errors.password = "Username or password incorrect";
        setFormErrors(errors);
      });
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
            <h2 className="heading">Login</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-11">
            {authenticated ? (
              <LoggedInCard />
            ) : (
              <div className="login-card">
                <h3 className="mb-3 text-center">Access your account</h3>
                <form onSubmit={(e) => handleLogin(e)}>
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
                      error={formErrors.username || authUnsuccessful}
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
                      error={formErrors.password || authUnsuccessful}
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
                      Sign In
                    </button>
                  </div>
                </form>
                <div className="mb-3 d-flex">
                  <div className="w-50 form-check mb-0 ms-2">
                    <input class="form-check-input" type="checkbox" />
                    <h6 class="form-check-label mb-0">Remember Me</h6>
                  </div>
                  <div className="w-50 text-end mb-0 me-2">
                    <h6
                      className="pass-link mb-0"
                      onClick={() => setOpen(true)}
                      style={{ cursor: "pointer" }}
                    >
                      Forgot Password ?
                    </h6>
                    <ForgotPasswordDialog open={open} setOpen={setOpen} />
                  </div>
                </div>
                <p className="w-100 text-center">Or Sign In With</p>
                <div className="social d-flex text-center">
                  <a
                    href="http://localhost:8080/oauth2/authorization/google"
                    className="px-2 py-2 me-3 rounded"
                  >
                    <i class="fa-brands fa-google me-2"></i>
                    Google
                  </a>
                  <a
                    href="http://localhost:8080/oauth2/authorization/facebook"
                    className="px-2 py-2 ms-3 rounded"
                  >
                    <i class="fa-brands fa-facebook me-2"></i>
                    Facebook
                  </a>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="text-center mt-3">Don't have an account ?</p>
                  <a href="/register" className="signup-link mt-3 ms-3">
                    Sign Up
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

export default Login;
