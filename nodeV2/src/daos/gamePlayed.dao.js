import { Game_played, Stat } from "../utils/gamePlayedStat.js";

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
    const gamePlayed = await Game_played.findByPk(gamePlayedId, {
      include: [
        {
          model: Stat,
          as: "stats",
        },
        {
          model: Friend,
          as: "friends",
        },
      ],
    });
    return gamePlayed;
  } catch (error) {
    console.error(`gamePlayed.dao - readOne : ${error.message}`);
    return null;
  }
};

const updateById = async (gamePlayedId, comment, gameName) => {
  try {
    const gamePlayed = await Game_played.findByPk(gamePlayedId);
    await gamePlayed.update({ comment, gameName });
    return gamePlayed;
  } catch (error) {
    console.error(`gamePlayed.dao - updateById : ${error.message}`);
  }
};

const deleteById = async (gamePlayedId) => {
  try {
    const gamePlayed = await Game_played.findByPk(gamePlayedId);
    await gamePlayed.destroy();
    return gamePlayed;
  } catch (error) {
    console.error(`gamePlayed.dao - deleteById : ${error.message}`);
  }
};
const findStat = async (gamePlayedId) => {
  let gamePlayed = null;
  try {
    gamePlayed = await Game_played.findAll({
      where: { id: gamePlayedId },
      include: {
        model: Stat,
      },
    });
    return gamePlayed;
  } catch (error) {
    console.error(`gamePlayed.dao - findStat : ${error.message}`);
    return null;
  }
};

export const GamePlayedDAO = {
  readAll,
  create,
  readOne,
  updateById,
  deleteById,
  findStat,
};
