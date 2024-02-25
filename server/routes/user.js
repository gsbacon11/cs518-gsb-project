const express = require("express");
const router = express.Router();
const database = require('../database');
const {hashPassword} = require("../utils/helper");
const bodyparser = require("body-parser");


router.get("/",(req, res)=>{
    database.execute("select * from users;", function(err, result){
        res.send(result);
    })
});

/*
router.get("/:userID",(req,res)=>{
    try {
        database.execute("select * from users where userID=?;",
    [ req.params.userID]
    ,function(err, result){
            if(result==0){
                res.status(500).send("Record not found");
            }else{
                res.status(200).send(result);
            }
        })
    } catch(error){
        console.log(error.message);
    }
});*/

router.get("/exists/:email",(req,res)=>{
    try {
        database.execute("select * from users where email=?;",
    [ req.params.email]
    ,function(err, result){
            if(result==0){
                res.status(200).send({"found":false, "msg":"Email does not exists."});
            }else{  
                res.status(200).send({"found":true, "result":result});
            }
        })
    } catch(error){
        console.log(error.message);
    }
});

router.get("/info/:email",(req,res)=>{
    try {
        database.execute("select * from users where email=?;",
    [ req.params.email]
    ,function(err, result){
            if(result==0){
                res.status(200).send([false, "User does not exists."]);
            }else{  
                res.status(200).send([true, "Email already exists."]);
            }
        })
    } catch(error){
        console.log(error.message);
    }
});

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
                res.status(500).send("Record not inserted");
            }else{
                res.status(200).send("Record inserted successfully");
            }
        })
    } catch(error){
        console.log(error.message);
    }
});

router.put("/:userID",(req,res)=>{
    try {
        database.execute("update users set email=? where userID=?",
        [
        req.body.email,
        req.params.userID,
        ],function(err, result){
            if(result.affectedRows==0){
                res.status(401).send("Record not updated");
            }else{
                res.status(200).send("Record updated successfully");
            }
        })
    } catch(error){
        console.log(error.message);
    }
});

router.delete("/:userID",(req,res)=>{
    try {
        database.execute("delete from users where userID=?;",
    [req.params.userID]
    ,function(err, result){
            if(result.affectedRows==0){
                res.status(500).send("Record not deleted");
            }else{
                res.status(200).send("Record deleted successfully");
            }
        })
    } catch(error){
        console.log(error.message);
    }
});


module.exports = router;