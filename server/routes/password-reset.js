const express = require("express");
const router = express.Router();
const database = require("../database");
const {sendEmail, hashPassword} = require("../utils/helper");
const generator = require("generate-password");

router.post("/",(req,res)=>{
    try {
        const temp_password = generator.generate({length: 10,numbers: true});
        var hashedPassword = hashPassword(temp_password);
        database.execute("update users set password=? where email=?",
        [hashedPassword, req.body.email]
        ,function(err, result){
            if(result.affectedRows==0){
                res.status(200).send({"found": false});
            }else{
                res.status(200).send({"found": true});
                sendEmail(req.body.email, "ODU Portal Password Reset", "Temporary Password: " + temp_password);
            }
        })
    } catch(error){
        console.log(error.message);
    }
});

module.exports = router;