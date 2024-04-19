const express = require("express");
const router = express.Router();
const startupController = require("../controllers/startupController");


// test route
// Route: /api/auth/test
router.get("/test", startupController.test);

module.exports = router;