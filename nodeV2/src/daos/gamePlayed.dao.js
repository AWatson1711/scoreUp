import Game_played from "../models/Game_played.js";

const readAll = async (user_id) => {
  try {
    const gamePlayed = await Game_played.findAll({ where: { user_id } });
    return gamePlayed;
  } catch (e) {
    console.error(`gamePlayed.dao - readAll : ${e.message}`);
    return null;
  }
};

const create = async (comment, gameName, friendId, gameId, userId) => {
  try {
    await Game_played.create(comment, gameName);
  } catch (e) {
    console.error(`game_played.dao - create : ${e.message}`);
    return null;
  }
};

const readOne = async (gamePlayedId) => {
  try {
    const gamePlayed = await Game_played.findByPk(gamePlayedId);
    return gamePlayed;
  } catch (e) {
    console.error(`gamePlayed.dao - readAll : ${e.message}`);
    return null;
  }
};

const updateById = async (gamePlayedId, comment, gameName) => {
  const gamePlayed = await Game_played.findByPk(gamePlayedId);
  await gamePlayed.update({ comment, gameName });
  return gamePlayed;
};

const deleteById = async (gamePlayedId) => {
  const gamePlayed = await Game_played.findByPk(gamePlayedId);
  await gamePlayed.destroy();
  return gamePlayed;
};

export const GamePlayedDAO = {
  readAll,
  create,
  readOne,
  updateById,
  deleteById,
};