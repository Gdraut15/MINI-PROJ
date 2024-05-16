const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  studentLogin,
  getAllMarks,
  getAllSubjects,
  checkAttendance,
  forgotPassword,
  postOTP,
  updateProfile,
} = require("../controllers/studentController");

// Auth and Profile Related
router.post("/login", studentLogin);
router.post("/forgotPassword", forgotPassword);
router.post("/postOTP", postOTP);
router.put(
  "/updateProfile",
  passport.authenticate("jwt", { session: false }),
  updateProfile
);

// Performance Routes
router.get(
  "/getMarks",
  passport.authenticate("jwt", { session: false }),
  getAllMarks
);
router.get(
  "/getAllSubjects",
  passport.authenticate("jwt", { session: false }),
  getAllSubjects
);
router.get(
  "/checkAttendance",
  passport.authenticate("jwt", { session: false }),
  checkAttendance
);

module.exports = router;
