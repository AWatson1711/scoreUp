import Friend from "../models/Friend.js";

const create = async (name, email, number, userId) => {
  let result = null;
  try {
    result = Friend.create(name, email, number);
  } catch (error) {
    console.error(error.message);
    result.json(error.message);
  }
  return result;
};

const findByEmail = async (email) => {
  const emailUser = await Friend.findOne({ where: { email: email } });
  return emailUser;
};

const readAll = async (user_id) => {
  try {
    const friends = await Friend.findAll({ where: { user_id } });
    return friends;
  } catch (e) {
    console.error(`friend.dao - readAll : ${e.message}`);
    return null;
  }
};

const updateById = async (friendId, name, email, number) => {
  const friend = await Friend.findByPk(friendId);
  await friend.update({ name, email, number });
  return friend;
};

const readOne = async (friendId) => {
  try {
    const friends = await Friend.findByPk(friendId);
    return friends;
  } catch (e) {
    console.error(`friend.dao - readOne : ${e.message}`);
    return null;
  }
};

const deleteById = async (friendId) => {
  const friend = await Friend.findByPk(friendId);
  await friend.destroy();
  return friend;
};

export const FriendDAO = {
  create,
  findByEmail,
  readAll,
  updateById,
  readOne,
  deleteById,
};
