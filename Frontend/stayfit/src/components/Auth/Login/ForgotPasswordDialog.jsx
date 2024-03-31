import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

function ForgotPasswordDialog({ open, setOpen }) {
  const handleForgetPassword = async (email) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/forgot-password?email=${email}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Email sent successfully");
        console.log("Email sent successfully");
      }
    } catch (error) {
      console.log("Error sending email: ", error);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            handleForgetPassword(formJson.email);
            setOpen(false);
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email that you used to register. <br /> You will
            receive a link to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            InputLabelProps={{
              style: { color: "black" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "black" }} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button sx={{ color: "black" }} type="submit">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ForgotPasswordDialog;
