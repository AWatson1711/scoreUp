import { GamePlayedDAO } from "../../daos/gamePlayed.dao.js";

export const createGamePlayed = async (req, res) => {
  try {
    const { comment, gameName, friendId, gameId, userId } = req.body;
    const gamePlayed = await GamePlayedDAO.create({
      comment,
      game_name: gameName,
      friend_id: friendId,
      game_id: gameId,
      user_id: userId,
    });
    res.status(201).json({
      message: "gamePlayed_created",
      comment,
      gameName,
    });
  } catch (e) {
    console.error(e.message);
  }
};
