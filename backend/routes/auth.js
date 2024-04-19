const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authController = require("../controllers/authController");

// Route: /api/auth/register
// Description: Register a new user
router.post("/register", authController.register);

// Route: /api/auth/login
// Description: Login a user
router.get("/login", authController.login);

// test route
// Route: /api/auth/test
router.get("/test", authController.test);

module.exports = router;