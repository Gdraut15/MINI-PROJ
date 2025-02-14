import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import authToken from "./redux/utils/authToken";
import store from "./redux/store";

import { 
  setFacultyUser, 
  facultyLogout 
} from "./redux/actions/facultyAction";
import { 
  setStudent, // Changed setStudentUser to setStudent
  studentLogout 
} from "./redux/actions/studentAction";

import { 
  FacultyStudentLogin, 
  FacultyDashboard, 
  FacultyUploadMarks, 
  FacultyAttendance, 
  StudentDashboard, 
  StudentSubjectList, 
  StudentPerformance, 
  StudentAttendance, 
  StudentUpdateProfile,  
  StudentFeedback, 
  StudentDetails, 
  FacultyUpdateProfile, 
  ForgotPassword,
  Blog,
  BlogDetails,
  Create
} from "./pages";

// Handle JWT Token
if (window.localStorage.facultyToken) {
  authToken(localStorage.facultyToken);
  const decoded = jwt_decode(localStorage.facultyToken);
  store.dispatch(setFacultyUser(decoded));

  // Check if token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(facultyLogout());
    window.location.href = "/";
  }
} else if (window.localStorage.studentToken) {
  authToken(localStorage.studentToken);
  const decoded = jwt_decode(localStorage.studentToken);
  store.dispatch(setStudent(decoded));

  // Check if token expired
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(studentLogout());
    window.location.href = "/";
  }
}

function App() {
  const store = useSelector((store) => store);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<FacultyStudentLogin />} />
          <Route exact path="/faculty" element={<FacultyDashboard />} />
          <Route exact path="/home" element={<StudentDashboard />} />
          <Route exact path="/student/subjects" element={<StudentSubjectList />} />
          <Route exact path="/student/performance" element={<StudentPerformance />} />
          <Route exact path="/student/attendance" element={<StudentAttendance />} />
          <Route exact path="/student/studentFeedback" element={<StudentFeedback />} /> 
          <Route exact path="/profile/:registrationNumber" element={<StudentDetails />} />
          <Route exact path="/student/update" element={<StudentUpdateProfile />} />
          <Route exact path="/faculty/update" element={<FacultyUpdateProfile />} />
          <Route exact path="/faculty/marks" element={<FacultyUploadMarks />} />
          <Route exact path="/faculty/attendance" element={<FacultyAttendance />} />
          <Route exact path="/forgotPassword/:user" element={<ForgotPassword />} />
          <Route exact path="/student/blog" element={<Blog />} /> 
          <Route exact path="/create" element={<Create />} /> 
          <Route exact path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
