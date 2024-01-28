
function validateEmail (email) {
    email_regex = /^[0-9a-zA-Z]+@[0-9a-zA-Z]+[\.]{1}[0-9a-zA-Z]+[\.]?[0-9a-zA-Z]+$/;
    if(email_regex.test(email)){
        return true;
    }
    return false;
};

function validatePassword (password) {
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


var email_error_shown = false;
var password_error_shown = false;

function inputValidation () {
    // Get user input for email and password
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;
    var error = false;
    // Validate email 
    var element_login_email = document.getElementById("login-email");
    var element_div_error_email = document.getElementById("div-error-email");
    if(!validateEmail(email)) {
        // Email NOT correct format
        error = true;
        if(!email_error_shown) { 
            element_login_email.style["border-color"] = "red";
            element_div_error_email.innerHTML =
            "<label>Please enter a valid email</label>";
            email_error_shown = true;
        }
    } else {
        // Email good
        element_login_email.style["border-color"] = "var(--silver_reign)";
        element_div_error_email.innerHTML = ""
        email_error_shown = false;
    }
    // Validate Password
    var element_login_password = document.getElementById("login-password");
    var element_div_error_password = document.getElementById("div-error-password");
    if(!validatePassword(password)) {
        // Password NOT correct format
        error = true;
        if(!password_error_shown){
            element_login_password.style["border-color"] = "red";
            element_div_error_password.innerHTML =
            "<label>Password must be greater than 7 characters with no spaces. Please try again.</label>"
            password_error_shown = true;
        }
    } else {
        // Password good
        element_login_password.style["border-color"] = "var(--silver_reign)";
        element_div_error_password.innerHTML = ""
        password_error_shown = false;
    }
    // Noe error, redirect to setup duo
    if (!email_error_shown && !password_error_shown){
        window.location.href = "./user/user_main.html";
    }
}