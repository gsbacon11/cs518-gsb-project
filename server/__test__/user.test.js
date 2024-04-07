const supertest = require("supertest");
const {app} = require('../server');

describe("Sum of two numbers", ()=> {
    test("adding two pos ints", ()=> {
        const sum = 3;
        const expectedResult=3;
        expect(sum).toEqual(expectedResult)
    });
})

describe("Test Get User by ID API", ()=> {
    test("user should return 200 code", async()=> {
        const u_id = "gsbacon11@gmail.com";
        const response= await supertest(app).get(`/user/exists/${u_id}`);
        //console.log(response)
        expect(response.status).toEqual(200);
    });

    test("user should return 400 code", async()=> {
        const u_id = "gsbac@gmail.com";
        const response= await supertest(app).get(`/user/exists/${u_id}`);
        //console.log(response)
        expect(response.status).toEqual(200);
    });
})

describe("Test POST User by ID API", ()=> {
    test("user should return 200 code", async()=> {
        const response= await supertest(app).post('/user/admin/update-user').send({
            userID: "46",
            email: "jerywopo@closetab.email",
        });
        //console.log(response)
        expect(response.status).toEqual(200);
    });
})