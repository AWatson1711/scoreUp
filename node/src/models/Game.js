const { DataTypes } = require("sequelize");
const db = require("../db/db");

const Game = db.define(
  "Game",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
  },
);

module.exports = Game;
