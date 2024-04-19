/*
investor_interests

interest_id (Primary Key): Unique integer identifier for each interest record.
investor_id (Foreign Key): Identifies the interested investor.
startup_id (Foreign Key): Identifies the startup the investor is interested in.
is_approved (Boolean): Tracks whether the startup has approved the investor's interest (default: False).
*/

const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Startup = require("./Startup");

const Interest = sequelize.define("investor_interests", {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    investor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    startup_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    is_approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
});

// Define a one-to-one association between the User and Interest models
Interest.belongsTo(User, {
    foreignKey: "investor_id",
});

// Define a one-to-one association between the Startup and Interest models
Interest.belongsTo(Startup, {
    foreignKey: "startup_id",
});

module.exports = Interest;
