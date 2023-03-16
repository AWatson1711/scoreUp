import User from "../models/User.js";
import bcrypt from "bcrypt";

const create = async (name, firstname, email, number, password) => {
  let result = null;
  try {
    result = User.create(name, firstname, email, number, password);
  } catch (error) {
    console.error(error.message);
    result.json(error.message);
  }
  return result;
};

const findByEmail = async (email) => {
  const emailUser = await User.findOne({ where: { email: email } });
  return emailUser;
};

const deleteById = async (userId) => {
  const user = await User.findByPk(userId);
  await user.destroy();
  return user;
};

const updateById = async (userId, name, firstname, number, email, password) => {
  const user = await User.findByPk(userId);
  const hash = await bcrypt.hash(password, 10).then((hash) => {
    user.update({ name, firstname, number, email, password: hash });
  });
  return user;
};

const readAll = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (e) {
    console.error(`user.dao - readAll : ${e.message}`);
    return null;
  }
};

const readById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (e) {
    console.error(`user.dao - readById : ${e.message}`);
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
};
