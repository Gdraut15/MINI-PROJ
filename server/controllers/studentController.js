const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//utils
const keys = require("../config/key");
const sendEmail = require("../utils/nodemailer");

//Models
const Student = require("../models/Student");
const Subject = require("../models/Subject");
const Attendance = require("../models/Attendance");
const Mark = require("../models/Marks");

//File Handler
const bufferConversion = require("../utils/bufferConversion");
const cloudinary = require("../utils/cloudinary");

//Validation
const validateStudentLoginInput = require("../validation/studentLogin");
const validateForgotPassword = require("../validation/forgotPassword");
const validateOTP = require("../validation/otpValidation");

exports.studentLogin = async (req, res, next) => {
  const { errors, isValid } = validateStudentLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { registrationNumber, password } = req.body;

  const student = await Student.findOne({ registrationNumber });
  if (!student) {
    errors.registrationNumber = "Registration number not found";
    return res.status(404).json(errors);
  }

  const validPassword = await bcrypt.compare(password, student.password);
  if (!validPassword) {
    errors.password = "Wrong password";
    return res.status(404).json(errors);
  }

  const payload = { id: student.id, student };
  jwt.sign(payload, keys.secretOrKey, { expiresIn: "2d" }, (err, token) => {
    res.json({
      success: true,
      token: "Bearer " + token,
    });
  });
};

exports.checkAttendance = async (req, res, next) => {
  try {
    const studentId = req.user._id;
    const attendance = await Attendance.find({ student: studentId }).populate(
      "subject"
    );
    if (!attendance) {
      res.status(400).json({ message: "Attendance not found" });
    }

    res.status(200).json({
      result: attendance.map((att) => {
        let res = {};
        res.attendance = (
          (att.lecturesAttended / att.totalLectures) *
          100
        ).toFixed(2);
        res.subjectCode = att.subject.subjectCode;
        res.subjectName = att.subject.subjectName;
        res.maxHours = att.subject.totalLectures;
        res.absentHours = att.totalLectures - att.lecturesAttended;
        res.totalLectures = att.totalLectures;
        return res;
      }),
    });
  } catch (err) {
    console.log("Error in getting attending details", err.message);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const { department, year, section } = req.body;
    const students = await Student.find({ department, year, section });
    if (students.length === 0) {
      return res.status(400).json({ message: "No student found" });
    }

    return res.status(200).json({ result: students });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getStudentByName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const students = await Student.find({ name });
    if (students.length === 0) {
      return res.status(400).json({ message: "No student found" });
    }
    return res.status(200).json({ result: students });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.getStudentByRegNum = async (req, res, next) => {
  try {
    const { registrationNumber } = req.body;
    console.log(req.body);
    const students = await Student.findOne({ registrationNumber });
    if (!students) {
      return res.status(400).json({ message: "No student found" });
    }

    return res.status(200).json({ result: students });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateForgotPassword(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email } = req.body;
    const student = await Student.findOne({ email });

    if (!student) {
      errors.email = "Email not found";
      return res.status(400).json(errors);
    }

    function generateOTP() {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }

      return OTP;
    }

    const otp = generateOTP();
    student.otp = otp;
    await student.save();
    await sendEmail(student.email, otp, "OTP");
    res.status(200).json({ message: "Check your registered email for OTP" });

    const helper = async () => {
      student.otp = "";
      await student.save();
    };

    setTimeout(function () {
      helper();
    }, 3000);
  } catch (err) {
    console.log("Error in sending email", err.message);
  }
};

exports.postOTP = async (req, res, next) => {
  try {
    const { errors, isValid } = validateOTP(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, otp, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Password Mismatch";
      return res.status(400).json(errors);
    }
    const student = await Student.findOne({ email });
    if (student.otp !== otp) {
      errors.otp = "Invalid OTP, check your email again";
      return res.status(400).json(errors);
    }

    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log("Error in submitting OTP", err.message);
    return res.status(400).json({ message: "Error in submitting OTP" });
  }
};

exports.getAllSubjects = async (req, res, next) => {
  try {
    const { department, year } = req.user;
    const subjects = await Subject.find({ department, year });

    if (subjects.length === 0) {
      return res.status(404).json({ message: "No subjects found" });
    }
    res.status(200).json({ result: subjects });
  } catch (err) {
    return res.status(400).json({ "Error in fetching subjects": err.message });
  }
};

exports.getAllMarks = async (req, res, next) => {
  try {
    const { department, year, id } = req.user;
    const getMarks = await Mark.find({ department, student: id }).populate(
      "subject"
    );

    const UnitTest1 = getMarks.filter((obj) => {
      return obj.exam === "Unit Test 1";
    });

    const UnitTest2 = getMarks.filter((obj) => {
      return obj.exam === "Unit Test 2";
    });

    const Semester = getMarks.filter((obj) => {
      return obj.exam === "Semester";
    });

    res.status(200).json({
      result: {
        UnitTest1,
        UnitTest2,
        Semester,
      },
    });
  } catch (err) {
    return res.status(400).json({ "Error in getting marks": err.message });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const {
      email,
      studentMobileNumber,
      fatherName,
      fatherMobileNumber,
      registrationNumber,
    } = req.body;

    const student = await Student.findOne({ registrationNumber });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { _id } = student;

    const updatedData = {
      email,
      studentMobileNumber,
      fatherName,
      fatherMobileNumber,
    };

    const updatedStudent = await Student.findByIdAndUpdate(_id, updatedData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      updatedStudent,
    });
  } catch (err) {
    console.log("Error in updating Profile", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
