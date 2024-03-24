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
    database.execute(
      "select * from terms",
      function (err, result) {
        res.status(200).send(result);
      },
    );
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
      database.execute("insert into sheets (userID, termCurrent, termLast, gpa) VALUES (?, ? ,?, ?);",
      [req.body.userID, req.body.termCurrent, req.body.termLast, req.body.gpa],
      function (err, result) {
        const allCourses = req.body.preReqs.concat(req.body.courses)
        allCourses.forEach(course => {
          database.execute("insert into sheets2courses (sheetID, courseName) VALUES (?, ?);",
        [result.insertId, course.Course],
        )
      })
      })
    res.status(200).send([]);
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

router.get("/admin/courses", verifyToken, (req, res) => {
  try {
    database.execute(
      "select * from courses",
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

router.post("/admin/update-courses", verifyToken, (req, res) => {
  try {
    
    //for (var i = 0; i < 1; ++i) {
    req.body.courses.forEach(course => {
      database.execute("update courses set isPrereq=? where courseName=?", [
        course.isPrereq, course.courseName
      ]);
    })
    res.status(200).send([]);
  } catch (error) {
    console.log(error.message);
    res.status(401).send([]);
  }
});

module.exports = router;
