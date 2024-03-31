import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function DeleteAccount() {
  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/v1/customer/account",
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Account deleted successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error deleting account: ", error);
    }
  };

  return (
    <div class="col-xl-12">
      <div class="card mt-2 mb-3">
        <div class="card-header">Delete Account</div>
        <div class="card-body">
          <p>
            Deleting your account is a permanent action and cannot be undone. If
            you are sure you want to delete your account, select the button
            below.
          </p>
          <button
            class="btn btn-danger text-danger"
            type="button"
            onClick={() => setOpenAccountDialog(true)}
          >
            I understand, delete my account
          </button>
          <Dialog
            open={openAccountDialog}
            onClose={() => setOpenAccountDialog(false)}
          >
            <DialogTitle>
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogActions>
              <Button
                sx={{ color: "black" }}
                onClick={() => setOpenAccountDialog(false)}
              >
                No
              </Button>
              <Button
                sx={{ color: "black" }}
                onClick={() => handleDeleteAccount()}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default DeleteAccount;
