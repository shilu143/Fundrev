/*
users

user_id (Primary Key): Unique integer identifier for each user.
username (Unique): User's chosen username for login.
password: Securely hashed password value.
user_type: Indicates user role ('investor' or 'startup').

*/

const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("user", {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = User;
