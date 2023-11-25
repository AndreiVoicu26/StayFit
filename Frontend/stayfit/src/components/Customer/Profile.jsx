import React from "react";
import Navbar from "./Navbar";

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="profile" class="container-xl">
        <div class="section ms-md-5 ps-md-3 top">
          <h1>Edit Profile</h1>
        </div>
        <div class="row align-items-center ms-md-5">
          <div class="col-xl-4">
            <div class="card profile-picture mt-2">
              <div class="card-header text-center">Profile Picture</div>
              <div class="card-body text-center py-5">
                <img
                  class="img"
                  src="https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
                  alt=""
                />
                <button
                  class="btn btn-primary mt-4 mb-2 d-block mx-auto"
                  type="button"
                >
                  Upload new image
                </button>
              </div>
            </div>
          </div>
          <div class="col-xl-8">
            <div class="card mt-2">
              <div class="card-header text-center">Account Details</div>
              <div class="card-body">
                <form>
                  <div class="mb-3">
                    <label class="mb-1" for="inputUsername">
                      Username
                    </label>
                    <input
                      class="form-control"
                      id="inputUsername"
                      type="text"
                      value="andrei26"
                    />
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="mb-1" for="inputFirstName">
                        First name
                      </label>
                      <input
                        class="form-control"
                        id="inputFirstName"
                        type="text"
                        value="Andrei"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="mb-1" for="inputLastName">
                        Last name
                      </label>
                      <input
                        class="form-control"
                        id="inputLastName"
                        type="text"
                        value="Voicu"
                      />
                    </div>
                  </div>
                  <div class="mb-3">
                    <label class="mb-1" for="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      class="form-control"
                      id="inputEmailAddress"
                      type="email"
                      value="andreivoicu80@gmail.com"
                    />
                  </div>
                  <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                      <label class="mb-1" for="inputPhone">
                        Phone number
                      </label>
                      <input
                        class="form-control"
                        id="inputPhone"
                        type="tel"
                        value="555-123-4567"
                      />
                    </div>
                    <div class="col-md-6">
                      <label class="mb-1" for="inputBirthday">
                        Birthday
                      </label>
                      <input
                        class="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        value="06/10/1988"
                      />
                    </div>
                  </div>
                  <button class="btn btn-primary" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="section ms-md-5 ps-md-3 mt-3">
          <h1>Billing</h1>
        </div>
        <div class="row align-items-center ms-md-5">
          <div class="col-xl-6">
            <div class="card plan mt-2">
              <div class="card-header">Current Plan</div>
              <div class="card-body">
                <div class="h3">$59.99 / month</div>
                <a class="d-flex align-items-center mb-1" href="#!">
                  Switch to 6 months billing - $339 / 6 months
                  <i class="fa-solid fa-arrow-right-long ms-2"></i>
                </a>
                <a class="d-flex align-items-center" href="#!">
                  Switch to yearly billing - $659.99 / year
                  <i class="fa-solid fa-arrow-right-long ms-2"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="card payment mt-2">
              <div class="card-header">Next billing due</div>
              <div class="card-body">
                <div class="h3">July 15 / 2024</div>
                <a className="px-3 btn btn-danger text-danger mt-4" href="">
                  Cancel membership
                </a>
              </div>
            </div>
          </div>
          <div class="col-xl-12">
            <div class="card plan mt-2">
              <div class="card-header">Payment method</div>
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between pe-3">
                  <div class="d-flex align-items-center">
                    <i class="fab fa-cc-visa fa-2x cc-color-visa"></i>
                    <div class="ms-4">
                      <h5>**** **** **** 5362</h5>
                      <h6 class="text-muted">Expires 04/2024</h6>
                    </div>
                  </div>
                  <div class="ms-4">
                    <a href="#!">Edit</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section ms-md-5 ps-md-3 mt-3">
          <h1>Security</h1>
        </div>
        <div class="row align-items-center ms-md-5">
          <div class="col-xl-12">
            <div class="card mt-2">
              <div class="card-header">Change Password</div>
              <div class="card-body">
                <form>
                  <div class="mb-3">
                    <label class="mb-1" for="currentPassword">
                      Current Password
                    </label>
                    <input
                      class="form-control"
                      id="currentPassword"
                      type="password"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="mb-1" for="newPassword">
                      New Password
                    </label>
                    <input
                      class="form-control"
                      id="newPassword"
                      type="password"
                    />
                  </div>
                  <div class="mb-3">
                    <label class="mb-1" for="confirmPassword">
                      Confirm Password
                    </label>
                    <input
                      class="form-control"
                      id="confirmPassword"
                      type="password"
                    />
                  </div>
                  <button class="btn btn-primary" type="button">
                    Change
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="col-xl-12">
            <div class="card mt-2 mb-3">
              <div class="card-header">Delete Account</div>
              <div class="card-body">
                <p>
                  Deleting your account is a permanent action and cannot be
                  undone. If you are sure you want to delete your account,
                  select the button below.
                </p>
                <button class="btn btn-danger text-danger" type="button">
                  I understand, delete my account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
