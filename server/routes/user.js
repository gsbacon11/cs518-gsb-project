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

router.get("/terms", verifyToken, (req, res) => {
  try {
    database.execute("select * from terms", function (err, result) {
      res.status(200).send(result);
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.get("/levels-prereq", verifyToken, (req, res) => {
  try {
    database.execute(
      "select DISTINCT level FROM courses WHERE isPrereq is true",
      function (err, result) {
        res.status(200).send(result);
      },
    );
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.get("/levels-courses", verifyToken, (req, res) => {
  try {
    database.execute(
      "select DISTINCT level FROM courses WHERE isPrereq is false",
      function (err, result) {
        res.status(200).send(result);
      },
    );
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.post("/submit-sheet", verifyToken, (req, res) => {
  try {
    database.execute(
      "insert into sheets (userID, termCurrent, termLast, gpa) VALUES (?, ? ,?, ?);",
      [req.body.userID, req.body.termCurrent, req.body.termLast, req.body.gpa],
      function (err, result) {
        const allCourses = req.body.preReqs.concat(req.body.courses);
        allCourses.forEach((course) => {
          database.execute(
            "insert into sheets2courses (sheetID, courseName) VALUES (?, ?);",
            [result.insertId, course.Course],
          );
        });
      },
    );
    res.status(200).send([]);
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.get("/sheets-status/:userID", verifyToken, (req, res) => {
  try {
    database.execute(
      "select date, termCurrent, status, notes from sheets where userID=? ORDER BY date DESC;",
      [req.params.userID],
      function (err, result) {
        res.status(200).send(result);
      },
    );
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.get("/courses-taken/:userID", verifyToken, (req, res) => {
  try {
    database.execute(
      "SELECT s2c.courseName, sht.status FROM users as usr, sheets as sht, sheets2courses as s2c WHERE usr.userID = sht.userid AND sht.sheetID = s2c.sheetID AND sht.status != 'Rejected' AND usr.userID = ?",
      [req.params.userID],
      function (err, result) {
        res.status(200).send(result);
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
      "select userID, firstName, lastName, email, isApproved from users where isApproved = false",
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

router.post("/admin/update-user", verifyToken, (req, res) => {
  try {
    database.execute("update users set isApproved=true where userID=?", [
      req.body.userID,
    ]);
    sendEmail(
      req.body.email,
      "ODU Course Advising Portal Account Approved",
      "Your account has offcially been approved by the administrator! Feel free to login at any time.",
    );
    res.status(200).send([]);
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.get("/admin/courses", verifyToken, (req, res) => {
  try {
    database.execute("select * from courses", function (err, result) {
      if (result == 0) {
        res.status(200).send(result);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.post("/admin/update-courses", verifyToken, (req, res) => {
  try {
    //for (var i = 0; i < 1; ++i) {
    database.execute("update courses set isPrereq=? where courseName=?", [
      req.body.isPrereq,
      req.body.courseName,
    ]);
    res.status(200).send([]);
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.get("/admin/sheets", verifyToken, (req, res) => {
  try {
    database.execute(
      "SELECT usr.userID, sht.sheetID, sht.gpa, sht.termLast, sht.notes, usr.firstName, usr.lastName, usr.email, sht.date, sht.termCurrent, sht.status FROM sheets as sht, users as usr WHERE usr.userID = sht.userID ORDER BY sht.date DESC",
      function (err, result) {
        res.status(200).send(result);
      },
    );
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.get("/admin/sheet-details/:sheetID", verifyToken, (req, res) => {
  try {
    database.execute(
      "SELECT s2c.courseName, cs.isPrereq FROM sheets as sht, sheets2courses as s2c, courses as cs WHERE sht.sheetID = s2c.sheetID AND s2c.courseName = cs.courseName and sht.sheetID =?",
      [req.params.sheetID],
      function (err, result) {
        res.status(200).send(result);
      },
    );
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

router.post("/admin/update-status", verifyToken, (req, res) => {
  try {
    database.execute(
      "update sheets set status=?,notes=? where sheetID=?",
      [req.body.status, req.body.notes, req.body.sheetID],
      function (err, result) {
        if (result.affectedRows == 0) {
          res.status(500).send([]);
        } else {
          res.status(200).send([]);
          sendEmail(
            req.body.email,
            "ODU Course Advising Sheet Status Update",
            "Your ODU Advising Sheet Has Been " +
              req.body.status +
              ".\n Please login for more information!",
          );
        }
      },
    );
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

module.exports = router;
