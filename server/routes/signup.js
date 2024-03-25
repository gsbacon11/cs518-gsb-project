const express = require("express");
const router = express.Router();
const database = require("../database");
const jwt = require("jsonwebtoken");
const { hashPassword } = require("../utils/helper");

router.post("/", (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    database.execute(
      "insert into users (firstName, lastName, email, password, isAdmin, isApproved) values (?,?,?,?,?,?)",
      [req.body.firstName, req.body.lastName, req.body.email, hashedPassword, 0, 0],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(200).send({
            success: false,
            msg: "Request failed due to internal error. Please try again later.",
          });
        } else {
          res.status(200).send({ success: true });
        }
      },
    );
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
