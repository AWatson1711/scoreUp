import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Media from "./Media.js";
import Game_played from "./Game_played.js";

const Game = sequelize.define(
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

export default Game;
