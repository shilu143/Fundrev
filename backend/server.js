const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./config/database");
const authenticateToken = require("./middleware/authenticateToken");
const multer = require("multer");
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET;
const port = process.env.PORT || 80;
const upload = multer();

// Routes
const authRoutes = require("./routes/auth");
const investorRoutes = require("./routes/investor");
const startupRoutes = require("./routes/startup");

// Middleware
app.use(express.static("upload"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", upload.any(), authRoutes);
app.use("/api/investor", authenticateToken, investorRoutes);
app.use("/api/startup", authenticateToken, startupRoutes);

// Database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error);
  });

//   setup 404 page
app.use((req, res, next) => {
  res.status(404).json({ title: "Page Not Found" }); 
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
