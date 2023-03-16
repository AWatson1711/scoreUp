import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Stat from "./Stat.js";

const Game_played = sequelize.define(
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

export default Game_played;
