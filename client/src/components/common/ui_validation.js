export function validateEmailString(email) {
  const email_regex =
    /^[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/;
  if (email_regex.test(email)) {
    return true;
  }
  return false;
}

export function validatePasswordString(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{4,}$/;
  if (regex.test(password)) {
    return true;
  }
  return false;
}
