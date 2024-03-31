import axios from "axios";

export const validate = (credentials, setFormErrors, setIsFormValid) => {
  const checkUsername = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/auth/check-username?username=${credentials.newUsername}`
      );
      if (!response.data.isUsernameAvailable) {
        setIsFormValid(false);
        let error = {};
        error.username = "Username already in use";
        setFormErrors(error);
      } else {
        setIsFormValid(true);
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  let errors = {};
  let isValid = true;

  if (
    credentials.newUsername.length > 0 &&
    !/^[a-zA-Z0-9]+$/.test(credentials.newUsername)
  ) {
    isValid = false;
    errors.username = "Username must contain only letters and numbers";
  }

  if (
    credentials.newPassword.length > 0 &&
    !/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(credentials.newPassword)
  ) {
    isValid = false;
    errors.password =
      "Password must contain at least 8 characters, letters and numbers";
  }

  if (
    credentials.newUsername.length === 0 &&
    credentials.newPassword.length === 0
  ) {
    isValid = false;
    errors.username = "Username or Password is required";
    errors.password = "Username or Password is required";
  }

  checkUsername();

  setFormErrors(errors);
  return isValid;
};
