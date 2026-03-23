export interface SignupFormdata {
  email: string;
  password: string;
  displayName: string;
}

export function validateSignupFormData(formData: SignupFormdata) {
  const { email, password, displayName } = formData;

  //Email validation
  if (
    !email ||
    typeof email !== "string" ||
    !email.trim() ||
    !email.includes("@")
  ) {
    throw new Error("Please provide a valid email address");
  }

  //Password validation
  if (!password || typeof password !== "string" || password.trim().length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  if (password.trim().length > 30) {
    throw new Error("Password must be less than 30 characters long");
  }

  //Name validation
  if (
    !displayName ||
    typeof displayName !== "string" ||
    displayName.trim().length < 3
  ) {
    throw new Error("Name must be at least 3 characters long");
  }
  if (displayName.trim().length > 20) {
    throw new Error("Name must be less than 20 characters long");
  }
  return formData;
}
