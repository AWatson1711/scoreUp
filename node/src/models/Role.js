const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Role = db.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
