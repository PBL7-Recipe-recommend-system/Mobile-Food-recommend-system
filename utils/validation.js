export const validatePassword = (password) => {
  if (password === "" || password === undefined) return false;
  // Regular expression for password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateEmail = (email) => {
  // Regular expression for email validation
  if (email === "" || email === undefined) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateLoginForm = (email, password) => {
  return validateEmail(email) && validatePassword(password);
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const validateRegisterForm = (
  name,
  email,
  password,
  confirmPassword
) => {
  if (email === "" || email === undefined || name === "") return false;
  return validateEmail(email) && validatePassword(password);
};
