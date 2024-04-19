
const sequelize = require("../config/database");

exports.test = (req, res) => {
  res.json({ message: "Fine everything!" });
};
