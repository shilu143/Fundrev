const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretkey = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, secretkey, async (err, user) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid token" });
      }
	  let userInstance;
      try {
        userInstance = await User.findOne({
          where: {
            _id: user._id,
          },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
		return;
      }
      if (!userInstance) {
        console.log("User not found");
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = userInstance;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = authenticateToken;
