import Friend from "../models/Friend.js";

const create = async (name, email, number, userId) => {
  let result = null;
  try {
    result = Friend.create(name, email, number);
  } catch (error) {
    console.error(`friend.dao - readAll : ${error.message}`);
  }
  return result;
};

const findByEmail = async (email) => {
  try {
    const emailUser = await Friend.findOne({ where: { email: email } });
    return emailUser;
  } catch (error) {
    console.error(`friend.dao - readAll : ${error.message}`);
  }
};

const readAll = async (user_id) => {
  try {
    const friends = await Friend.findAll({ where: { user_id } });
    return friends;
  } catch (error) {
    console.error(`friend.dao - readAll : ${error.message}`);
    return null;
  }
};

const updateById = async (friendId, name, email, number) => {
  try {
    const friend = await Friend.findByPk(friendId);
    await friend.update({ name, email, number });
    return friend;
  } catch (error) {
    console.error(`friend.dao - updateById : ${error.message}`);
  }
};

const readOne = async (friendId) => {
  try {
    const friends = await Friend.findByPk(friendId);
    return friends;
  } catch (error) {
    console.error(`friend.dao - readOne : ${error.message}`);
    return null;
  }
};

const deleteById = async (friendId) => {
  try {
    const friend = await Friend.findByPk(friendId);
    await friend.destroy();
    return friend;
  } catch (error) {
    console.error(`friend.dao - readOne : ${error.message}`);
  }
};

export const FriendDAO = {
  create,
  findByEmail,
  readAll,
  updateById,
  readOne,
  deleteById,
};
