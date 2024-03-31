import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "./AuthProvider.jsx";

function Payment() {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    membershipType: "ONE_MONTH",
  });
  const { status, pay, checkStatus, checkAuth } = useAuth();
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

  return (
    <div className="img js-fullheight auth">
      <div className="overlay"></div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="text-center mb-4">
            <h2 className="heading">Membership</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-5 col-lg-6 col-md-8 col-11">
            {status === "" ? (
              <div className="login-card">
                <h3 className="mb-3 text-center">Invalid request</h3>
                <button
                  className="form-control btn btn-primary px-3 mb-5"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
              </div>
            ) : status === "ACTIVE" ? (
              <div class="login-card">
                <h3 className="mb-3 text-center">Your account is ACTIVE</h3>
                <button
                  className="form-control btn btn-primary px-3 mb-5"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to your account
                </button>
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
                              <p class="value mb-0">$329.99</p>
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
                              <p class="value mb-0">$599.99</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="my-4 px-4">
                    {!paymentSuccess && (
                      <button
                        className="form-control btn btn-primary px-3"
                        onClick={handlePayAndSignUp}
                      >
                        Pay & Sign Up
                      </button>
                    )}
                    <Modal
                      open={isPaying}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Box
                        className="col-xl-5 col-lg-6 col-md-8 col-11 py-5"
                        sx={{
                          backgroundColor: "#f4f6f6",
                          borderRadius: "20px",
                        }}
                      >
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
                                borderRadius: "20px",
                                padding: "30px",
                                margin: "50px",
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
  );
}

export default Payment;
