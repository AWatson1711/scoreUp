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

const updateById = async (id, name, firstname, password, email) => {
  let result = null;
  try {
    result = await User.update(
      {
        name,
        firstname,
        password,
        email,
      },
      { where: { id } },
    );
  } catch (e) {
    console.log(e.message);
  }
  return result;
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
