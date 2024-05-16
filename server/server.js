const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Setup Middlewares
const app = express();
let server = http.createServer(app);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");

app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);

// 404 Route Error
app.use((req, res, next) => {
  const error = new Error("Invalid Route");
  error.status = 404;
  next(error);
});

// Error Handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then((data) => {
    console.log(`MongoDB connected with server ${data.connection.host}`);
  })
  .catch((err) => {
    console.log("Error in connecting to MongoDB", err.message);
  });

app.use("/", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// Start Server
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
