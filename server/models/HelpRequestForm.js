const { DataTypes } = require("sequelize");
const { db } = require("../db/db");

const HelpRequestForm = db.define("HelpRequestForm", {
  name: DataTypes.STRING,
  status: DataTypes.STRING,
  email: DataTypes.STRING,
  description: DataTypes.STRING
});

module.exports = {
   HelpRequestForm,
};