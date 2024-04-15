const express = require("express");
const router = express.Router();
const database = require("../database");
const { sendEmail, hashPassword, verifyToken } = require("../utils/helper");
const generator = require("generate-password");

router.post("/", (req, res) => {
  try {
    const temp_password = generator.generate({ length: 10, numbers: true}) + "1d@F";
    var hashedPassword = hashPassword(temp_password);
    database.execute(
      "update users set password=?, passwordReset=1 where email=?",
      [hashedPassword, req.body.email],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(200).send({ found: false });
        } else {
          res.status(200).send({ found: true });
          sendEmail(
            req.body.email,
            "ODU Course Advising Portal Password Reset",
            "Temporary Password: " + temp_password,
          );
        }
      },
    );
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/onlogin", verifyToken, (req, res) => {
  try {
    var hashedPassword = hashPassword(req.body.password);
    database.execute(
      "update users set password=?, passwordReset=0 where userID=?",
      [hashedPassword, req.body.userID],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(500).send({ found: false });
        } else {
          res.status(200).send({ found: true });
        }
      },
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
