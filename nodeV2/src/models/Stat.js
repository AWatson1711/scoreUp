import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";

const Stat = sequelize.define(
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

export default Stat;

// import Game_played from "./Game_played.js";

// Game_played.hasMany(Stat, {
//   foreignKey: {
//     allowNull: true,
//     name: "game_played_id",
//   },
//   sourceKey: "id",
// });
