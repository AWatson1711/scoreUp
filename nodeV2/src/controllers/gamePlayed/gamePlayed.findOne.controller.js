import { GamePlayedDAO } from "../../daos/gamePlayed.dao.js";
import Game_played from "../../models/Game_played.js";

export const readOneGamePlayed = async (req, res) => {
  const gamePlayedId = parseInt(req.params.id);
  const userId = req.body.userId;
  try {
    // if (userId && userId !== GamePlayedDAO.user_id) {
    //   console.log(GamePlayedDAO);
    //   return res.status(401).json({ error: "Access Denied" });
    // }
    const gamePlayed = await GamePlayedDAO.findStat(gamePlayedId);
    if (!!gamePlayed === false) {
      return res.status(400).json({ message: `can't retrieve game played` });
    }

    // const stat = await GamePlayedDAO.findStat(gamePlayedId);

    res.status(200).json({ gamePlayed });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
