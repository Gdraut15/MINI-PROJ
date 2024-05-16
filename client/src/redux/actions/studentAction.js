import axios from "axios";
import authToken from "../utils/authToken";
import jwt_decode from "jwt-decode";
import { SET_STUDENT, SET_ERRORS_HELPER } from "../actionTypes";

export const setStudent = (data) => {
  return {
    type: SET_STUDENT,
    payload: data,
  };
};

export const studentLogin = (studentCredentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/student/login",
        studentCredentials
      );
      const { token } = data;

      localStorage.setItem("studentToken", token);
      authToken(token);

      const decoded = jwt_decode(token);
      dispatch(setStudent(decoded));
    } catch (err) {
      dispatch({
        type: SET_ERRORS_HELPER,
        payload: err.response.data,
      });
    }
  };
};

export const getStudentByRegNum = (registrationNumber) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/student/getStudentByRegNum", {
        registrationNumber,
      });
      dispatch(setStudent(data.result)); // Assuming this returns student data
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOTPStudent = (email) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/student/forgotPassword", email);
      alert("OTP sent to your email");
    } catch (err) {
      dispatch({
        type: SET_ERRORS_HELPER,
        payload: err.response.data,
      });
    }
  };
};

export const submitOTPStudent = (credentials) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/student/postOTP", credentials);
      alert("Password updated. Please login again");
    } catch (err) {
      dispatch({
        type: SET_ERRORS_HELPER,
        payload: err.response.data,
      });
    }
  };
};

export const studentUpdate = (updatedData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.put(
        "http://localhost:8000/api/student/updateProfile",  // Corrected URL
        updatedData,
        config
      );

      // Dispatch action to set updated student data
      dispatch(setStudent(data.result)); // Assuming the server returns updated student data
      alert("Profile updated successfully");
    } catch (err) {
      console.log("Error in updating student info", err.message);
      dispatch({
        type: SET_ERRORS_HELPER,
        payload: err.response.data,
      });
    }
  };
};

export const getAllSubjects = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/student/getAllSubjects");
      // Dispatch action to set subjects
    } catch (err) {
      console.log("Error in getting subjects", err.message);
    }
  };
};

export const fetchAttendance = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/student/checkAttendance");
      // Dispatch action to set attendance data
    } catch (err) {
      console.log("Error in fetching attendance", err.message);
    }
  };
};

export const getMarks = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/student/getMarks");
      // Dispatch action to set marks data
    } catch (err) {
      console.log("Error in getting marks", err.message);
    }
  };
};

export const studentLogout = () => (dispatch) => {
  localStorage.removeItem("studentToken");
  authToken(false);
  dispatch(setStudent({}));
};
