/*
sales_data

sales_data_id (Primary Key): Unique integer identifier for each sales record.
startup_id (Foreign Key): Links the sales record to the corresponding startup.
sales_amount: Value of the sale (e.g., decimal value for currency).
sales_date: Date the sale occurred.
*/

const Sequelize = require("sequelize");
const sequelize = require("../config/database");
const Startup = require("./Startup");

const Sales = sequelize.define("sales_data", {
    _id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startup_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    sales_amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    sales_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

// Define a one-to-one association between the Startup and Sales models
Sales.belongsTo(Startup, {
    foreignKey: "startup_id",
});

module.exports = Sales;