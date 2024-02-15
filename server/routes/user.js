const express = require("express");
const router = express.Router();
const database = require('../database');



router.get("/",(req,res)=>{
    res.send("user api")
    database.execute("select * user", function(err,result){
        res.send(result);
    })
});


module.exports = router;