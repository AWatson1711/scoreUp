import { DataTypes } from "sequelize";
import sequelize from "../db/db.js";
import Friend from "./Friend.js";
import User from "./User.js";

const UserFriend = sequelize.define(
  "UserFriend",
  {},
  {
    timestamps: true,
    createdAt: "created",
    updatedAt: "updated",
  },
);

User.belongsToMany(Friend, { through: UserFriend });
Friend.belongsToMany(User, { through: UserFriend });

export default UserFriend;
