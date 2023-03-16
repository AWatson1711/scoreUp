import { StatDAO } from "../../daos/stat.dao.js";

export const createStat = async (req, res) => {
  try {
    const { victory, score, friendId, gamePlayedId, userId } = req.body;
    console.log(friendId);
    const stat = await StatDAO.create({
      victory,
      score,
      friend_id: friendId,
      game_played_id: gamePlayedId,
      user_id: userId,
    });
    res.status(201).json({
      message: "stat_created",
      stat,
    });
  } catch (e) {
    console.error(e.message);
  }
};
