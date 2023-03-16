import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import User from "./User.js";

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Role.hasMany(User, {
  foreignKey: {
    allowNull: false,
    name: "role_id",
  },
  sourceKey: "id",
});

export default Role;
