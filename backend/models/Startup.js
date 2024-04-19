/*
startups

startup_id (Primary Key): Unique integer identifier for each startup.
company_name: The official name of the startup.
business_description: Text description of the startup's business.
revenue: Startup's revenue (e.g., decimal value for currency).
user_id (Foreign Key): Links the startup to its creator's user account.
*/

const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Startup = sequelize.define("startup", {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    business_description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    revenue: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

// Define a one-to-one association between the User and Startup models
Startup.belongsTo(User, {
    foreignKey: "user_id",
});

module.exports = Startup;