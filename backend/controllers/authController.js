const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = process.env.JWT_SECRET;
const saltRounds = 10;
const User = require("../models/User");
const Startup = require("../models/Startup");
const sequelize = require("../config/database");

exports.register = async (req, res) => {
  // start a transaction
  const t = await sequelize.transaction();
  try {
    const {
      username,
      password,
      user_type,
      company_name,
      business_description,
      revenue,
    } = req.body;

    if (!username || !password || !user_type) {
      return res
        .status(400)
        .json({ error: "username, password, and user_type are required" });
    }

    if (
      user_type === "startup" &&
      (!company_name || !business_description || !revenue)
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (user_type !== "startup" && user_type !== "investor") {
      return res.status(400).json({ error: "Invalid user type" });
    }

    if (user_type === "startup") {
      if (revenue < 0) {
        return res.status(400).json({ error: "Revenue cannot be negative" });
      }
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create(
      {
        username,
        password: hashedPassword,
        user_type,
      },
      { transaction: t }
    );

    if (user_type === "startup") {
      const newStartup = await Startup.create(
        {
          company_name,
          business_description,
          revenue,
          user_id: newUser._id,
        },
        { transaction: t }
      );
    }

    const token = jwt.sign(
      {
        _id: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // commit the transaction
    await t.commit();
    res.json({ token, user: newUser });
  } catch (error) {
    console.error(error);
    // revert the transaction if there was an error
    await t.rollback();
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "username and password are required" });
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid username" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.test = (req, res) => {
  res.json({ message: secretkey });
};
