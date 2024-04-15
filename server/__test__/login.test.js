const supertest = require("supertest");
const {app} = require('../server');

const test_email = "gsbacon11extra@gmail.com";
const test_password = "Aa1234567!!!";
var global_token;
var global_userID;
var global_loginID;

describe("Test Login Procedure", ()=> {
    test("Login Attempt: Invalid Email", async()=> {
        const response= await supertest(app).post('/login')
        .send({
            email: "notindatabase@unknown.email",
            password: "doesnt_matter_for_this_test"
        });
        expect(response.status).toEqual(401);
        expect(response.text).toEqual("Email not found!");
    });

    test("Login Attempt: Valid Email, Incorrect Password", async()=> {
        const response= await supertest(app).post('/login')
        .send({
            email: test_email,
            password: "incorrect_password"
        });
        expect(response.status).toEqual(401);
        expect(response.text).toEqual("[]");
    });

    test("Login Authorization and Token Creation", async()=> {
        const response= await supertest(app).post('/login')
        .send({
            email: test_email,
            password: test_password
        });
        global_token = response.body.data.toke
        global_userID = response.body.data.userID;
        expect(response.status).toEqual(200);
        expect(response.body.data.email).toEqual(test_email);
        expect(global_userID).toEqual(49);
    });

    test("Email Verification Code with Invalid Token Authentication", async()=> {
        const response= await supertest(app).get('/login')
        .set({"Content-Type": "application/json",token: -1});
        expect(response.status).toEqual(401);
        expect(response.text.substring(10,23)).toEqual("Invalid token");
    });

    test("Email Verification Code with Token Authentication", async()=> {
        const response= await supertest(app).get('/login')
        .set({"Content-Type": "application/json",token: global_token});
        global_loginID = response.body[1];
        expect(response.status).toEqual(200);
    });

    test("Invalid 2FA Code", async()=> {
        const response= await supertest(app).post('/login/authenticate-login')
        .send({
            userID: global_userID,
            passcode: -1
        })
        .set({"Content-Type": "application/json",token: global_token});
        expect(response.status).toEqual(401);
    });
    
    test("Valid 2FA Code with Invalid Token Authentication", async()=> {
        const response= await supertest(app).post('/login/authenticate-login')
        .send({
            userID: global_userID,
            passcode: global_loginID
        })
        .set({"Content-Type": "application/json",token: -1});
        expect(response.status).toEqual(401);
        expect(response.text.substring(10,23)).toEqual("Invalid token");
    });

    test("Valid 2FA Code with Token Authentication", async()=> {
        const response= await supertest(app).post('/login/authenticate-login')
        .send({
            userID: global_userID,
            passcode: global_loginID
        })
        .set({"Content-Type": "application/json",token: global_token});
        expect(response.status).toEqual(200);
    });

})
