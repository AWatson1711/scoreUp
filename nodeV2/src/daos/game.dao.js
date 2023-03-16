import Game from "../models/Game.js";
import User from "../models/User.js";

const readAll = async (user_id) => {
  try {
    const games = await Game.findAll({ where: { user_id } });
    return games;
  } catch (e) {
    console.error(`user.dao - readAll : ${e.message}`);
    return null;
  }
};

const create = async (name, gameId) => {
  try {
    const user = await User.findByPk(gameId);
    await Game.create(name);
    return user;
  } catch (e) {
    console.error(`game.dao - create : ${e.message}`);
    return null;
  }
};

const updateById = async (gameId, name) => {
  const game = await Game.findByPk(gameId);
  await game.update({ name });
  return game;
};

const deleteById = async (gameId) => {
  const game = await Game.findByPk(gameId);
  await game.destroy();
  return game;
};

const readOne = async (gameId) => {
  try {
    const games = await Game.findByPk(gameId);
    return games;
  } catch (e) {
    console.error(`user.dao - readAll : ${e.message}`);
    return null;
  }
};

export const GameDAO = {
  readAll,
  create,
  updateById,
  deleteById,
  readOne,
};
