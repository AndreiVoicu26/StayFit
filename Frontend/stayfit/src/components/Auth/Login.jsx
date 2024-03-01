import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "./AuthProvider.jsx";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [authUnsuccessful, setAuthUnsuccessful] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { authenticated, login, logout, checkAuth, role } = useAuth();

  const handleSignIn = () => {
    login(formData).catch((error) => {
      setAuthUnsuccessful(true);
      let errors = {};
      errors.username = "Username or password incorrect";
      errors.password = "Username or password incorrect";
      setFormErrors(errors);
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (formData.username == "") {
      isValid = false;
      errors.username = "Username is required";
    } else {
      if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
        isValid = false;
        errors.username = "Username must contain only letters and numbers";
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForgetPassword = async (email) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password?email=${email}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Email sent successfully");
      }
    } catch (error) {
      console.log("Error sending email: ", error);
    }
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
            <h2 className="heading">Login</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            {authenticated ? (
              <div class="login-card">
                <h3 className="mb-3 text-center">You are already logged in</h3>
                <Button
                  className="form-control btn btn-primary px-3"
                  onClick={() => logout()}
                >
                  Log out
                </Button>
                <h3 className="text-center mt-3">or</h3>
                <Button
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
                </Button>
              </div>
            ) : (
              <div className="login-card">
                <h3 className="mb-3 text-center">Access your account</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault(true);
                    validate();
                    if (validate()) {
                      handleSignIn();
                    }
                  }}
                >
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
                      error={formErrors.password || authUnsuccessful}
                      label={formErrors.password}
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
                      Sign In
                    </button>
                  </div>
                  <div className="mb-3 d-md-flex">
                    <div className="w-50 form-check ms-2">
                      <input class="form-check-input" type="checkbox" />
                      <label class="form-check-label">Remember Me</label>
                    </div>
                    <div className="w-50 text-end me-2">
                      <a
                        href="#"
                        className="pass-link"
                        onClick={handleClickOpen}
                      >
                        Forgot Password ?
                      </a>
                      <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          component: "form",
                          onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                              formData.entries()
                            );
                            handleForgetPassword(formJson.email);
                            handleClose();
                          },
                        }}
                      >
                        <DialogTitle sx={{ textAlign: "center" }}>
                          Reset Password
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            To reset your password, please enter your email
                            address here. You will receive a link to reset your
                            password.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button sx={{ color: "black" }} onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button sx={{ color: "black" }} type="submit">
                            Send
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </form>
                <p className="w-100 text-center">- Or Sign In With -</p>
                <div className="social d-flex text-center">
                  <a
                    href="http://localhost:8080/oauth2/authorization/google"
                    className="px-2 py-2 me-md-1 rounded"
                  >
                    <i class="fa-brands fa-google me-2"></i>
                    Google
                  </a>
                  <a
                    href="http://localhost:8080/oauth2/authorization/facebook"
                    className="px-2 py-2 ms-md-1 rounded"
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
