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

export function verifyEmail(email) {
    var email = document.getElementById("input-email").value;
    var element_input_email = document.getElementById("input-email");
    var element_div_error_email = document.getElementById("div-error-email");
    if(!validateEmailString(email)) {
        // Email NOT correct format
         element_input_email.style["border-color"] = "red";
        element_div_error_email.innerHTML =
        "<label>Please enter a valid email</label>";
        return false;
    } else {
        // Email good
        element_input_email.style["border-color"] = "var(--silver_reign)";
        element_div_error_email.innerHTML = ""
    }
    return true;
}

export function verifyPassword(){
    var password = document.getElementById("input-password").value;
    var element_input_password = document.getElementById("input-password");
    var element_div_error_password = document.getElementById("div-error-password");
    if(!validatePasswordString(password)) {
        // Password NOT correct format
        element_input_password.style["border-color"] = "red";
        element_div_error_password.innerHTML =
        "<label>Password must be greater than 7 characters with no spaces.</label>"

        return false;
    } else {
        // Password good
        element_input_password.style["border-color"] = "var(--silver_reign)";
        element_div_error_password.innerHTML = ""
    }
    return true;
}

export function verifyMatchingPasswords () {
    var div_error_password_retype = document.getElementById("div-error-password_retype");
    var element_input_password = document.getElementById("input-password");
    var element_input_password_retype = document.getElementById("input-password_retype");
    if(element_input_password.value != element_input_password_retype.value){
        element_input_password_retype.style["border-color"] = "red";
        div_error_password_retype.innerHTML =
        "<label>Passwords do not match. Please try again.</label>"
        return false;
    } else {
        // Passwords match
        element_input_password_retype.style["border-color"] = "var(--silver_reign)";
        div_error_password_retype.innerHTML = ""
    }
    return true;
}
/*
 function onSignIn () {
    var email_valid = verifyEmail();
    var password_valid = verifyPassword();
    if(email_valid && password_valid){
        email_error_shown = false;
        password_error_shown = false;
        window.location.href = "./user/user_main.html";
    }
}
*/
/*
function onPasswordReset () {
    if(verifyEmail()){
        email_error_shown = false;
        password_error_shown = false;
        console.log("Send email to reset password");
    }
}*/
/*
function onSignUp () {
    // Verify email and password
    var email_valid = verifyEmail();
    var password_valid = verifyPassword();
    var passwords_match = verifyMatchingPasswords();
    if(email_valid && password_valid && passwords_match){
        email_error_shown = false;
        password_error_shown = false;
        console.log("Signed up!");
    }
}*/

function onPasswordReset () {
    // Verify email and password
    var password_valid = verifyPassword();
    var passwords_match = verifyMatchingPasswords();
    if(email_valid && password_valid && passwords_match){
        email_error_shown = false;
        password_error_shown = false;
        console.log("Password Reset!");
    }
}
