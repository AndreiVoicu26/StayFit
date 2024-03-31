import { React, useState, useEffect } from "react";
import Navbar from "./Navbar";
import UserInfo from "../Profile/UserInfo/UserInfo";
import BillingInfo from "../Profile/BillingInfo";
import ChangeCredentials from "../Profile/Security/CredentialsChange";
import DeleteAccount from "../Profile/DeleteAccount";
import axios from "axios";

function Profile() {
  const [isOAuthUser, setIsOAuthUser] = useState(false);

  const checkOAuthUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/check-oauth2-user",
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (response.data === true) {
          setIsOAuthUser(true);
        } else {
          setIsOAuthUser(false);
        }
      }
    } catch (error) {
      console.log("Error checking OAuth user: ", error);
    }
  };

  useEffect(() => {
    checkOAuthUser();
  }, []);

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
          <BillingInfo />
          <div class="section ms-md-5 ps-md-3 mt-3">
            <h1>Security</h1>
          </div>
          <div class="row align-items-center ms-md-5">
            {!isOAuthUser && <ChangeCredentials />}
            <DeleteAccount />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
