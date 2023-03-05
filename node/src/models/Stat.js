const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Stat = db.define(
  "Stat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    victory: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
  },
);

module.exports = Stat;
