import Game from "../models/Game.js";
import User from "../models/User.js";

const readAll = async (user_id) => {
  try {
    const games = await Game.findAll({ where: { user_id } });
    return games;
  } catch (error) {
    console.error(`user.dao - readAll : ${error.message}`);
    return null;
  }
};

const create = async (name, gameId) => {
  try {
    const user = await User.findByPk(gameId);
    await Game.create(name);
    return user;
  } catch (error) {
    console.error(`game.dao - create : ${error.message}`);
    return null;
  }
};

const updateById = async (gameId, name) => {
  try {
    const game = await Game.findByPk(gameId);
    await game.update({ name });
    return game;
  } catch (error) {
    console.error(`game.dao - updateById : ${error.message}`);
  }
};

const deleteById = async (gameId) => {
  try {
    const game = await Game.findByPk(gameId);
    await game.destroy();
    return game;
  } catch (error) {
    console.error(`game.dao - deleteById : ${error.message}`);
  }
};

const readOne = async (gameId) => {
  try {
    const games = await Game.findByPk(gameId);
    return games;
  } catch (error) {
    console.error(`user.dao - readOne : ${error.message}`);
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
