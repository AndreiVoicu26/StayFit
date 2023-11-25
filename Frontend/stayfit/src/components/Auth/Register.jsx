import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [switchToPayment, setSwitchToPayment] = useState(false);
  const [validPayment, setValidPayment] = useState(null);
  const [initializePayment, setInitializePayment] = useState(false);

  //Validate credit card number
  const validatePayment = () => {
    setValidPayment(true);
    if (!validPayment) {
      setTimeout(() => {
        setInitializePayment(false);
      }, 3000);
    }
  };

  return (
    <div>
      {!switchToPayment ? (
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
                <div className="login-card pb-0">
                  <h3 className="mb-3 text-center">Create your account</h3>
                  <form action="#">
                    <div className="name-group d-flex">
                      <div className="mb-3 me-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          required
                        />
                      </div>
                      <div className="mb-3 ms-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="E-mail"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        id="password-field"
                        className="form-control"
                        placeholder="Password"
                        required
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
                        onClick={() => setSwitchToPayment(true)}
                      >
                        Next
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
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                <div className="login-card pb-4">
                  <h3 className="mb-3 text-center">Choose your membership</h3>
                  <form action="#">
                    <div class="d-flex justify-content-center align-items-center">
                      <div class="radio-tile-group">
                        <div class="pricing-card">
                          <input
                            class="radio-button"
                            type="radio"
                            name="radio"
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
                          />
                          <div class="radio-tile">
                            <div class="pricing-info text-center">
                              <h5 class="period mb-0">1 Year</h5>
                              <p class="value mb-0">$659.99</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <input
                        type=""
                        className="form-control"
                        placeholder="Credit Card Number"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Cardholder Name"
                        required
                      />
                    </div>
                    <div className="name-group d-flex">
                      <div className="mb-3 me-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Expiration Date"
                          required
                        />
                      </div>
                      <div className="mb-3 ms-2">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="CVV"
                          required
                        />
                      </div>
                    </div>
                    <div className="name-group d-flex w-100">
                      <div className="mb-3 me-2 w-50">
                        <button
                          type="submit"
                          className={`form-control btn btn-primary submit px-3"
                          ${
                            initializePayment &&
                            (validPayment ? "validated" : "not-validated")
                          }`}
                          onClick={() => {
                            setInitializePayment(true);
                            validatePayment();
                          }}
                        >
                          {!initializePayment ? (
                            "Complete Payment"
                          ) : validPayment ? (
                            <i class="fa-regular fa-circle-check"></i>
                          ) : (
                            <i class="fa-regular fa-circle-xmark"></i>
                          )}
                        </button>
                      </div>
                      <div className="mb-3 ms-2 w-50">
                        <button
                          type="submit"
                          className="form-control btn btn-primary submit px-3"
                          disabled={!validPayment}
                        >
                          <Link to="/dashboard">Sign Up</Link>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
