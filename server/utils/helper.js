const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

function hashPassword(password){
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password,salt);
}

function comparePassword(raw, hashed){
    return bcrypt.compareSync(raw, hashed);
}

function verifyToken(req, res, next){
    const token  = req.header("token");
    if(!token){
        return res.status(401).json({error: "Access denied"});
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.userID = decoded.user;
        next();
    } catch(error) {
        res.status(401).json({error: "Invalid token"});
    }
}

function sendEmail(email, subject, body){
    const transport = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: subject,
        html: body
    }
    transport.sendMail(mailOptions, function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log("email sent");
        }
    });
}

module.exports = {
    hashPassword,
    comparePassword,
    verifyToken,
    sendEmail,
};