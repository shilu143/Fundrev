// Migrate the database

const sequelize = require("./config/database");
const User = require("./models/User");
const Startup = require("./models/Startup");
const Sales = require("./models/Sales");
const Interest = require("./models/Interest");

sequelize
    .sync({
        force: true,
    })
    .then(() => {
        console.log("Database synced successfully.");
    })
    .catch((error) => {
        console.error("Error syncing database:", error);
    });


