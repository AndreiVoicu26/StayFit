import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { validate } from "./CredentialsValidator";
import axios from "axios";

function CredentialsChange() {
  const [credentials, setCredentials] = useState({
    currentPassword: "",
    newUsername: "",
    newPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [openCredentialsDialog, setOpenCredentialsdDialog] = useState(false);
  const navigate = useNavigate();

  const handleChangeCredentials = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/user/credentials",
        credentials,
        { withCredentials: true }
      );
      if (response.status === 200) {
        if (response.data === true) {
          console.log("Credentials changed successfully");
          navigate("/login");
        }
      }
    } catch (error) {
      setIncorrectPassword(true);
      setOpenCredentialsdDialog(false);
      console.log("Error changing credentials: ", error);
    }
  };

  const form_control = {
    width: "100%",
    ".MuiInputBase-input": {
      height: "30px",
      padding: "5px 20px",
    },
  };

  return (
    <div class="col-xl-12">
      <div class="card mt-2">
        <div class="card-header">
          <h5 className="mb-0">Change Credentials</h5>
        </div>
        <div class="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault(true);
              validate(credentials, setFormErrors, setIsFormValid);
              if (
                validate(credentials, setFormErrors, setIsFormValid) &&
                isFormValid
              ) {
                setOpenCredentialsdDialog(true);
              }
            }}
          >
            <div class="mb-3">
              <label class="mb-1">Current Password</label>
              <TextField
                sx={form_control}
                value={credentials.currentPassword}
                onChange={(e) => {
                  setIncorrectPassword(false);
                  setCredentials({
                    ...credentials,
                    currentPassword: e.target.value,
                  });
                }}
                error={incorrectPassword}
                label={incorrectPassword && "Incorrect password"}
                InputLabelProps={{
                  sx: {
                    fontSize: "1rem",
                  },
                }}
              />
            </div>
            <div class="mb-3">
              <label class="mb-1">New Username</label>
              <TextField
                sx={form_control}
                value={credentials.newUsername}
                onChange={(e) => {
                  formErrors.username = null;
                  setCredentials({
                    ...credentials,
                    newUsername: e.target.value,
                  });
                }}
                error={formErrors.username}
                label={formErrors.username}
                InputLabelProps={{
                  sx: {
                    fontSize: "1rem",
                  },
                }}
              />
            </div>
            <div class="mb-3">
              <label class="mb-1">New Password</label>
              <TextField
                sx={form_control}
                value={credentials.newPassword}
                onChange={(e) => {
                  formErrors.password = null;
                  setCredentials({
                    ...credentials,
                    newPassword: e.target.value,
                  });
                }}
                error={formErrors.password}
                label={formErrors.password}
                InputLabelProps={{
                  sx: {
                    fontSize: "1rem",
                  },
                }}
              />
            </div>
            <button class="btn btn-primary" type="submit">
              Save Changes
            </button>
            <Dialog
              open={openCredentialsDialog}
              onClose={() => setOpenCredentialsdDialog(false)}
            >
              <DialogTitle>
                Are you sure you want to change your credentials?
              </DialogTitle>
              <DialogActions>
                <Button
                  sx={{ color: "black" }}
                  onClick={() => setOpenCredentialsdDialog(false)}
                >
                  No
                </Button>
                <Button
                  sx={{ color: "black" }}
                  onClick={() => handleChangeCredentials()}
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CredentialsChange;
