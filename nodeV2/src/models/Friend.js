import { DataTypes } from "sequelize";
import Media from "./Media.js";
import Stat from "./Stat.js";
import Game_played from "./Game_played.js";

import sequelize from "../db/db.js";
import User from "./User.js";


const Friend = sequelize.define(
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
    allowNull: true,
    name: "friend_id",
  },
  sourceKey: "id",
});

Friend.hasMany(Stat, {
  foreignKey: {
    allowNull: true,
    name: "friend_id",
  },
  sourceKey: "id",
});

Friend.hasMany(Game_played, {
  foreignKey: {
    allowNull: true,
    name: "friend_id",
  },
  sourceKey: "id",
});

export default Friend;
