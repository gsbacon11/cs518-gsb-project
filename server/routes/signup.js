const express = require("express");
const router = express.Router();
const database = require("../database");
const {comparePassword, verifyToken} = require("../utils/helper");
const jwt = require("jsonwebtoken");
const {hashPassword} = require("../utils/helper");

router.post("/",(req,res)=>{
    try {
        const hashedPassword=hashPassword(req.body.password);
        database.execute("insert into users (email, password, isAdmin, isApproved) values (?,?,?,?)",
        [
        req.body.email,
        hashedPassword,
        0,
        0,
        ],function(err, result){
            if(result.affectedRows==0){
                res.status(500).send(["Request failed due to internal error. Please try again later."]);
            }else{
                res.status(200).send([]);
            }
        })
    } catch(error){
        console.log(error.message);
    }
});

module.exports = router;