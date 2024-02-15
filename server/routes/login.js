const express = require("express");
const router = express.Router();
const database = require('../database');
const {comparePassword} = require("../utils/helper");

router.post("/",(req,res)=>{
    try {
        database.execute("select * from users where email=?",
        [req.body.email]
        ,function(err, result){
            if(result.length==0){
                res.status(401).send("Email not found!");
            }else{
                if(comparePassword(req.body.password, result[0].password)){
                    res.status(200).send("Logged in!");
                }else{
                    res.status(401).send("Password does not match!");
                }
            }
        })
    } catch(error){
        console.log(error.message);
    }
});



module.exports = router;