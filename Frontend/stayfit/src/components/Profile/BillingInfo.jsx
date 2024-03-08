import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import axios from "axios";

function BillingInfo() {
  const [billingInfo, setBillingInfo] = useState({
    membershipType: "",
    nextBillingDate: Date.now(),
  });
  const [changeMembershipAllowed, setChangeMembershipAllowed] = useState(true);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const navigate = useNavigate();

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

  const handleChangeMembership = async (membershipType) => {
    let date = new Date(billingInfo.nextBillingDate);

    if (
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - 7,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      ) > Date.now()
    ) {
      setChangeMembershipAllowed(false);
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/customer/billing",
        { membershipType },
        { withCredentials: true }
      );
      if (response.status === 200) {
        fetchBillingInfo();
        console.log("Membership changed successfully");
      }
    } catch (error) {
      console.log("Error changing membership: ", error);
    }
  };

  const handleCancelMembership = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/customer/deactivate-account",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Membership cancelled successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error cancelling membership: ", error);
    }
  };

  useEffect(() => {
    fetchBillingInfo();
  }, []);

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
    <div>
      <div class="section ms-md-5 ps-md-3 mt-3">
        <h1>Billing</h1>
      </div>
      <div class="row align-items-center ms-md-5">
        <div class="col-xl-6">
          <div class="card plan mt-2">
            <div class="card-header">Current Plan</div>
            <div class="card-body">
              <div class="h3">{bill()}</div>
              {(billingInfo.membershipType === "SIX_MONTHS" ||
                billingInfo.membershipType === "ONE_YEAR") && (
                <a
                  class="d-flex align-items-center"
                  href="#"
                  onClick={() => handleChangeMembership("ONE_MONTH")}
                >
                  Switch to monthly billing - $59.99 / month
                  <i class="fa-solid fa-arrow-right-long ms-2"></i>
                </a>
              )}
              {(billingInfo.membershipType === "ONE_MONTH" ||
                billingInfo.membershipType === "ONE_YEAR") && (
                <a
                  class="d-flex align-items-center"
                  href="#"
                  onClick={() => handleChangeMembership("SIX_MONTHS")}
                >
                  Switch to 6 months billing - $329.99 / 6 months
                  <i class="fa-solid fa-arrow-right-long ms-2"></i>
                </a>
              )}
              {(billingInfo.membershipType === "ONE_MONTH" ||
                billingInfo.membershipType === "SIX_MONTHS") && (
                <a
                  class="d-flex align-items-center"
                  href="#"
                  onClick={() => handleChangeMembership("ONE_YEAR")}
                >
                  Switch to yearly billing - $599.99 / year
                  <i class="fa-solid fa-arrow-right-long ms-2"></i>
                </a>
              )}
              {!changeMembershipAllowed && (
                <Alert severity="error">
                  You can only change your membership type at least 1 week
                  before the next billing date
                </Alert>
              )}
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card payment mt-2">
            <div class="card-header">Next billing date</div>
            <div class="card-body">
              <div class="h3">
                {new Date(billingInfo.nextBillingDate).getDay()}{" "}
                {new Date(billingInfo.nextBillingDate).toLocaleString("en-US", {
                  month: "long",
                })}
                {" / "}
                {new Date(billingInfo.nextBillingDate).getFullYear()}
              </div>
              <a
                className="px-3 btn btn-danger text-danger mt-3 mb-1"
                href="#"
                onClick={() => setOpenStatusDialog(true)}
              >
                Cancel membership
              </a>
              <Dialog
                open={openStatusDialog}
                onClose={() => setOpenStatusDialog(false)}
              >
                <DialogTitle>
                  Are you sure you want to cancel your membership?
                </DialogTitle>
                <DialogActions>
                  <Button onClick={() => setOpenStatusDialog(false)}>No</Button>
                  <Button onClick={() => handleCancelMembership()} autoFocus>
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingInfo;
