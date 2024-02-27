const express = require("express");
const router = express.Router();
const database = require("../database");
const { verifyToken, sendEmail } = require("../utils/helper");

router.get("/exists/:email", (req, res) => {
  try {
    database.execute(
      "select * from users where email=?;",
      [req.params.email],
      function (err, result) {
        if (result == 0) {
          res.status(200).send({ found: false, msg: "Email does not exists." });
        } else {
          res.status(200).send({ found: true, result: result });
        }
      },
    );
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.get("/admin/account-requests", verifyToken, (req, res) => {
  try {
    database.execute(
      "select userID, email, isApproved from users where isApproved = false",
      function (err, result) {
        if (result == 0) {
          res.status(200).send(result);
        } else {
          res.status(200).send(result);
        }
      },
    );
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.post("/admin/approve-users", verifyToken, (req, res) => {
  try {
    for (var i = 0; i < 1; ++i) {
      database.execute("update users set isApproved=true where userID=?", [
        req.body.userIDs[i],
      ]);
      sendEmail(
        req.body.emails[i],
        "ODU Course Advising Portal Account Approved",
        "Your account has offcially been approved by the administrator! Feel free to login at any time.",
      );
    }
    res.status(200).send([]);
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

module.exports = router;
