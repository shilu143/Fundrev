const Sequelize = require("sequelize");
const config = require("./config.json");
const dotenv = require("dotenv").config();

config.username = process.env.DB_USERNAME;
config.password = process.env.DB_PASSWORD;
config.database = process.env.DB_NAME;
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

module.exports = sequelize;
