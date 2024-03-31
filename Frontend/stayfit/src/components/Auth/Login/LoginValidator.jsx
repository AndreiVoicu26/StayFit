export const validate = (formData, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (formData.username == "") {
    isValid = false;
    errors.username = "Username is required";
  } else {
    if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      isValid = false;
      errors.username = "Username must contain only letters and numbers";
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
