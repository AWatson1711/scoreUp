import Friend from "../models/Friend.js";
import User from "../models/User.js";
import UserFriend from "../models/UserFriend.js";

const create = async (name, email, number, userId) => {
  let result = null;
  try {
    const friend = await Friend.create({
      name,
      email,
      number,
    });
    result = friend;

    const user = await User.findByPk(userId);
    await user.addFriend(friend);
  } catch (error) {
    console.error(`friend.dao - create : ${error.message}`);
  }
  return result;
};

const findByEmail = async (email) => {
  try {
    const friendEmail = await Friend.findOne({
      where: { email: email },
    });
    return friendEmail;
  } catch (error) {
    console.error(`friend.dao - findByEmail : ${error.message}`);
  }
};

const readAll = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    const friends = await user.getFriends();
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
