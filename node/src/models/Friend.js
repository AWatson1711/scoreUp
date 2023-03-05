const { DataTypes } = require("sequelize");
const Media = require("./Media");
const Stat = require("./Stat");

const db = require("../db/db");

const Friend = db.define(
  "Friend",
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
Friend.hasMany(Media, {
  foreignKey: {
    allowNull: false,
    name: "friend_id",
  },
  sourceKey: "id",
});

Friend.hasMany(Stat, {
  foreignKey: {
    allowNull: false,
    name: "friend_id",
  },
  sourceKey: "id",
});

module.exports = Friend;
