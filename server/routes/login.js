const express = require("express");
const router = express.Router();
const database = require("../database");
const {comparePassword, verifyToken, generateLoginID} = require("../utils/helper");
const jwt = require("jsonwebtoken");
const {sendEmail} = require("../utils/helper");

router.get("/", verifyToken, (req,res) => {
    try {
        database.execute("select * from users where userID=?;",
        [req.userID],
        function(err, result){
            if(result==0){
                res.status(500).send("Record not found");
            }else{
                const rng = Math.floor(Math.random() * 1000000);
                var tmp_email = result[0].email;
                database.execute("update users set loginID=? where userID=?",
                [rng, req.userID],
                function(err, result){
                    if(result.affectedRows==0){
                    res.status(401).send("Record not updated");
                    }else{
                        sendEmail(tmp_email, "ODU Portal Login", "Verification Code: " + rng);
                    }
                })
                res.status(200).send(result);
            }
        })
    } catch(error){
        console.log(error.message);
    } 

});

router.post("/",(req,res)=>{
    try {
        database.execute("select * from users where email=?",
        [req.body.email]
        ,function(err, result){
            if(result.length==0){
                res.status(401).send("Email not found!");
            }else{
                if(comparePassword(req.body.password, result[0].password)){

                    const token = jwt.sign(
                    {
                        user: result[0].userID,
                        email: req.body.email
                    },
                    process.env.TOKEN_SECRET_KEY,
                    {expiresIn:"1h"}
                    );
                    res.status(200).send({
                        data: {
                            toke: token,
                            email: req.body.email,
                            userId: result[0].userID
                        }
                });
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