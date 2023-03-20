import Stat from "../models/Stat.js";

const readAll = async (user_id) => {
  try {
    const stats = await Stat.findAll({ where: { user_id } });
    return stats;
  } catch (e) {
    console.error(`stats.dao - readAll : ${e.message}`);
    return null;
  }
};

const readOne = async (statId) => {
  try {
    const stats = await Stat.findByPk(statId);
    return stats;
  } catch (error) {
    console.error(`stat.dao - readOne : ${error.message}`);
    return null;
  }
};

const create = async (victory, score, friendId, gamePlayedId) => {
  let result = null;
  try {
    result = Stat.create(victory, score);
  } catch (error) {
    console.error(error.message);
    result.json(error.message);
  }
  return result;
};

const updateById = async (statId, victory, score) => {
  try {
    const stat = await Stat.findByPk(statId);
    await stat.update({ victory, score });
    return stat;
  } catch (error) {
    console.error(`stat.dao - updateById : ${error.message}`);
  }
};

const deleteById = async (statId) => {
  try {
    const stat = await Stat.findByPk(statId);
    await stat.destroy();
    return stat;
  } catch (error) {
    console.error(`stat.dao - deleteById : ${error.message}`);
  }
};

export const StatDAO = {
  readAll,
  readOne,
  create,
  updateById,
  deleteById,
};
