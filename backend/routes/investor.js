const express = require("express");
const router = express.Router();
const investorController = require("../controllers/investorController");


// test route
// Route: /api/auth/test
router.get("/test", investorController.test);

module.exports = router;