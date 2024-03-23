import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import axios from "axios";

function QRCodeCard() {
  const [profile, setProfile] = useState({});
  const [billingInfo, setBillingInfo] = useState({});

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/profile",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setProfile(response.data);
      }
    } catch (error) {
      console.log("Error fetching profile info ", error);
    }
  };

  const fetchBillingInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/customer/billing",
        { withCredentials: true }
      );
      if (response.status === 200) {
        setBillingInfo(response.data);
      }
    } catch (error) {
      console.log("Error fetching billing info ", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchBillingInfo();
  }, []);

  const qrData = `Name: ${profile.firstName} ${profile.lastName} \nMembership Status: Active \nMembership Type: ${billingInfo.membershipType} \nAvailable until: ${billingInfo.nextBillingDate}`;

  const bill = () => {
    switch (billingInfo.membershipType) {
      case "ONE_MONTH":
        return "$59.99 / month";
      case "SIX_MONTHS":
        return "$329.99 / 6 months";
      case "ONE_YEAR":
        return "$599.99 / year";
      default:
        return "No membership";
    }
  };

  return (
    <div className="col-xl-6 mt-3">
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0 text-center">Scan the QR Code</h3>
        </div>
        <div className="card-body text-center">
          <QRCode value={qrData} size={227} />
          <h4 className="mt-3">
            Membership Status: <span className="active">Active</span>
          </h4>
          <h4>
            Membership Type: <span>{bill()}</span>
          </h4>
          <h4>
            Available until:{" "}
            <span>
              {new Date(billingInfo.nextBillingDate).getDay()}{" "}
              {new Date(billingInfo.nextBillingDate).toLocaleString("en-UK", {
                month: "long",
              })}
              {" / "}
              {new Date(billingInfo.nextBillingDate).getFullYear()}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default QRCodeCard;
