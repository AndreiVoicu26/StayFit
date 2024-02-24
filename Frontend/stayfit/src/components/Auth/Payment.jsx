import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "./AuthProvider.jsx";

function Register() {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    membershipType: "ONE_MONTH",
  });
  const { status, pay, checkStatus, checkAuth, authenticated } = useAuth();
  const navigate = useNavigate();

  const handlePayAndSignUp = () => {
    setIsPaying(true);

    setTimeout(() => {
      setPaymentSuccess(true);
    }, 3000);
  };

  useEffect(() => {
    if (paymentSuccess) {
      setTimeout(() => {
        pay(formData);
      }, 3000);
    }
  }, [paymentSuccess]);

  useEffect(() => {
    checkStatus();
    checkAuth();
  }, []);

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
              <h2 className="heading">Membership & Payment</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              {status === "" ? (
                <div className="login-card">
                  <h3 className="mb-3 text-center">Invalid request</h3>
                  <Button
                    className="form-control btn btn-primary px-3 mb-5"
                    onClick={() => navigate("/login")}
                  >
                    Go to Login
                  </Button>
                </div>
              ) : status === "ACTIVE" ? (
                <div class="login-card">
                  <h3 className="mb-3 text-center">Your account is ACTIVE</h3>
                  <Button
                    className="form-control btn btn-primary px-3 mb-5"
                    onClick={() => navigate("/dashboard")}
                  >
                    Go to Dashboard
                  </Button>
                </div>
              ) : (
                <div className="login-card pb-4">
                  {!paymentSuccess && (
                    <h3 className="mb-3 text-center">Choose your membership</h3>
                  )}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault(true);
                    }}
                  >
                    <div class="d-flex justify-content-center align-items-center">
                      {!paymentSuccess && (
                        <div class="radio-tile-group">
                          <div class="pricing-card">
                            <input
                              class="radio-button"
                              type="radio"
                              name="radio"
                              value="ONE_MONTH"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  membershipType: e.target.value,
                                })
                              }
                              checked
                            />
                            <div class="radio-tile">
                              <div class="pricing-info text-center">
                                <h5 class="period mb-0">1 Month</h5>
                                <p class="value mb-0">$59.99</p>
                              </div>
                            </div>
                          </div>
                          <div class="pricing-card">
                            <input
                              class="radio-button"
                              type="radio"
                              name="radio"
                              value="SIX_MONTHS"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  membershipType: e.target.value,
                                })
                              }
                            />
                            <div class="radio-tile">
                              <div class="pricing-info text-center">
                                <h5 class="period mb-0">6 Months</h5>
                                <p class="value mb-0">$339.99</p>
                              </div>
                            </div>
                          </div>
                          <div class="pricing-card">
                            <input
                              class="radio-button"
                              type="radio"
                              name="radio"
                              value="ONE_YEAR"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  membershipType: e.target.value,
                                })
                              }
                            />
                            <div class="radio-tile">
                              <div class="pricing-info text-center">
                                <h5 class="period mb-0">1 Year</h5>
                                <p class="value mb-0">$659.99</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="my-4 px-4">
                      {!paymentSuccess && (
                        <button
                          className="form-control btn btn-primary px-3 h-100"
                          onClick={handlePayAndSignUp}
                        >
                          Complete Payment <br /> & <br /> Sign Up
                        </button>
                      )}
                      <Modal open={isPaying}>
                        <Box sx={box_style}>
                          {!paymentSuccess ? (
                            <div
                              style={{
                                textAlign: "center",
                                width: "100%",
                                margin: "107px 0",
                              }}
                            >
                              <h3 style={{ color: "black", margin: "30px" }}>
                                Payment in progress...
                              </h3>
                              <CircularProgress sx={{ color: "black" }} />
                            </div>
                          ) : (
                            <div style={{ textAlign: "center", width: "100%" }}>
                              <h3
                                style={{
                                  color: "white",
                                  backgroundColor: "green",
                                  textAlign: "center",
                                  borderRadius: "40px",
                                  padding: "30px",
                                  margin: "50px 0",
                                }}
                              >
                                Payment Successful <br />
                                <i class="fa-regular fa-circle-check"></i>
                              </h3>
                              <h3 style={{ color: "black", margin: "30px" }}>
                                Signing up...
                              </h3>
                              <CircularProgress style={{ color: "black" }} />
                            </div>
                          )}
                        </Box>
                      </Modal>
                    </div>
                  </form>
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
