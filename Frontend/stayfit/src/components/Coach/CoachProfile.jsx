import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import UserInfo from "../Profile/UserInfo";
import CoachInfo from "../Profile/CoachInfo";
import ChangeCredentials from "../Profile/CredentialsChange";

function CoachProfile() {
  return (
    <div>
      <Navbar />
      <div className="img js-fullheight content-background"></div>
      <div id="profile">
        <div className="heading">
          <div className="container px-4">
            <div className="row align-items-center justify-content-between pt-4">
              <div className="mt-3 ms-md-5">
                <h1 className="title ms-md-3">Edit Profile</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4 sections">
          <UserInfo />
          <CoachInfo />
          <div class="section ms-md-5 ps-md-3 mt-3">
            <h1>Security</h1>
          </div>
          <div class="row align-items-center ms-md-5 mb-3">
            <ChangeCredentials />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachProfile;
