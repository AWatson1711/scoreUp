const { DataTypes } = require("sequelize");

const db = require("../db/db");

const Friend = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        message: "Cette adresse e-mail est déjà utilisée",
      },
    },
    number: {
      type: DataTypes.INTEGER(13),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
  },
);

module.exports = Friend;
