import User from "../models/User.js";
import bcrypt from "bcrypt";
import Role from "../models/Role.js";

const create = async (name, firstname, email, number, password) => {
  let result = null;
  try {
    result = User.create(name, firstname, email, number, password);
  } catch (error) {
    console.error(`User.dao - create : ${error.message}`);
  }
  return result;
};

const findByEmail = async (email) => {
  try {
    const emailUser = await User.findOne({ where: { email: email } });
    return emailUser;
  } catch (error) {
    console.error(`User.dao - findByEmail : ${error.message}`);
  }
};

const deleteById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    await user.destroy();
    return user;
  } catch (error) {
    console.error(`User.dao - deleteById : ${error.message}`);
  }
};

const updateById = async (userId, name, firstname, number, email, password) => {
  try {
    const user = await User.findByPk(userId);
    const hash = await bcrypt.hash(password, 10).then((hash) => {
      user.update({ name, firstname, number, email, password: hash });
    });
    return user;
  } catch (error) {
    console.error(`User.dao - updateById : ${error.message}`);
  }
};

const readAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error(`user.dao - readAll : ${error.message}`);
    return null;
  }
};

const readById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    console.error(`user.dao - readById : ${error.message}`);
    return null;
  }
};

const getRoleByUserId = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: Role,
    });
    if (user) {
      return user.Role.role;
    }
  } catch (error) {
    console.error(`user.dao - getRoleByUserId : ${error.message}`);
    return null;
  }
};

export const UserDAO = {
  create: create,
  findByEmail,
  deleteById,
  updateById,
  readAll,
  readById,
  getRoleByUserId,
};
