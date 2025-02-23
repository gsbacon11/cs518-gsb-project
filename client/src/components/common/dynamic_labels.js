export function ErrorEmailLabel() {
  return <label>Please enter a valid email.</label>;
}

export function ErrorPasswordLabel() {
  return <label>Password does not meet the complexity criteria.</label>;
}

export function ErrorPasswordsMismatchLabel() {
  return <label>Passwords do not match. Please try again.</label>;
}

export const ErrorLabel = ({ arg }) => {
  return <label>{arg}</label>;
};
