import { GamePlayedDAO } from "../../daos/gamePlayed.dao.js";

export const deleteGamePlayed = async (req, res) => {
  const gamePlayedId = parseInt(req.params.id);
  const userId = req.body.userId;
  try {
    // if (userId && userId !== GamePlayedDAO.user_id) {
    //   return res.status(401).json({ error: "Access Denied" });
    // }
    const gamePlayed = await GamePlayedDAO.deleteById(gamePlayedId);

    if (gamePlayed) {
      return res.json({
        message: `${gamePlayed.game_name} deleted successfuly`,
        data: gamePlayed,
      });
    } else {
      return res.status(404).json({ error: "GamePlayed not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
