export function validateEmailString (email) {
    var email_regex = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/;
    if(email_regex.test(email)){
        return true;
    }
    return false;
};

export function validatePasswordString (password) {
    // Password cannot contain white spaces
    if (/\s/.test(password)) {
        return false;
    }
    // Password length must be 8 or more
    if (password.length <= 7) {
        return false;
    }
    return true;

}
