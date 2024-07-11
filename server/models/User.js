const { DataTypes, STRING } = require("sequelize");
const { db } = require("../db/db");

const User = db.define("User", {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM,
    values: ["admin", "customer"],
    allowNull: false,
  },
});

module.exports = {
  User,
};