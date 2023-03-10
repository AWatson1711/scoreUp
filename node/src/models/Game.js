const { DataTypes } = require("sequelize");
const db = require("../db/db");
const Media = require("./Media");
const Game_played = require("./Game_played");

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

Game.hasMany(Media, {
  foreignKey: {
    allowNull: false,
    name: "game_id",
  },
  sourceKey: "id",
});

Game.hasMany(Game_played, {
  foreignKey: {
    allowNull: false,
    name: "game_id",
  },
  sourceKey: "id",
});

module.exports = Game;
