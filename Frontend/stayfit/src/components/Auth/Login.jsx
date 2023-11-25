import React from "react";

function Login() {
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
            <div className="login-card">
              <h3 className="mb-3 text-center">Access your account</h3>
              <form action="#">
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
                    <a href="#" className="pass-link">
                      Forgot Password ?
                    </a>
                  </div>
                </div>
              </form>
              <p className="w-100 text-center">- Or Sign In With -</p>
              <div className="social d-flex text-center">
                <a href="#" className="px-2 py-2 me-md-1 rounded">
                  <i class="fa-brands fa-google me-2"></i>
                  Google
                </a>
                <a href="#" className="px-2 py-2 ms-md-1 rounded">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
