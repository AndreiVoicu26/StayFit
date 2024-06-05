import axios from "axios";
import API_URL from "../../../config";

export const validate = (formData, setFormErrors, setIsFormValid) => {
  const checkEmail = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/auth/check-email?email=${formData.email}`
      );
      if (!response.data.isEmailAvailable) {
        setIsFormValid(false);
        let error = {};
        error.email = "Email already in use";
        setFormErrors(error);
      } else {
        setIsFormValid(true);
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const checkUsername = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/auth/check-username?username=${formData.username}`
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

  if (formData.firstName == "") {
    isValid = false;
    errors.firstName = "First name is required";
  } else {
    if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      isValid = false;
      errors.firstName = "Name must contain only letters";
    }
  }

  if (formData.lastName == "") {
    isValid = false;
    errors.lastName = "Last name is required";
  } else {
    if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      isValid = false;
      errors.lastName = "Name must contain only letters";
    }
  }

  if (formData.email == "") {
    isValid = false;
    errors.email = "Email is required";
  } else {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      isValid = false;
      errors.email = "Email not valid";
    } else {
      checkEmail();
    }
  }

  if (formData.username == "") {
    isValid = false;
    errors.username = "Username is required";
  } else {
    if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      isValid = false;
      errors.username = "Username must contain only letters and numbers";
    } else {
      checkUsername();
    }
  }

  if (formData.password == "") {
    isValid = false;
    errors.password = "Password is required";
  } else {
    if (!/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(formData.password)) {
      isValid = false;
      errors.password =
        "Password must contain at least 8 characters, letters and numbers";
    }
  }
  setFormErrors(errors);
  return isValid;
};
