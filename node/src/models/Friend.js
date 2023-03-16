import { DataTypes } from "sequelize";
import Media from "./Media.js";
import Stat from "./Stat.js";

import sequelize from "../db/db.js";

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

export default Friend;
