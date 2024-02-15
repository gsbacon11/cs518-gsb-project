const express = require("express");
const router = express.Router();
const database = require('../database');


router.get("/",(req,res)=>{
    database.execute("select * from users;", function(err,result){
        res.send(result);
    })
});


module.exports = router;