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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{4,}$/;
  if (regex.test(password)) {
    return true;
  }
  return false;
}
