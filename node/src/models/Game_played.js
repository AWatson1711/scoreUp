const { DataTypes } = require("sequelize");
const db = require("../db/db");
const Stat = require("./Stat");

const Game_played = db.define(
  "Game_played",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      //   Si c'est null ajouter une phrase par defaut
      allowNull: true,
    },
    game_name: {
      //   Nom de la partie jouer
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
  },
);

Game_played.hasMany(Stat, {
  foreignKey: {
    allowNull: false,
    name: "game_played_id",
  },
  sourceKey: "id",
});

module.exports = Game_played;
