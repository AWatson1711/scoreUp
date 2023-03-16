import { GamePlayedDAO } from "../../daos/gamePlayed.dao.js";

export const readOneGamePlayed = async (req, res) => {
  const gamePlayedId = parseInt(req.params.id);
  const userId = req.body.userId;
  try {
    if (userId && userId !== GamePlayedDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const gamePlayed = await GamePlayedDAO.readOne(gamePlayedId);

    if (!gamePlayed)
      return res.status(400).json({ message: `can't retrieve games played` });
    res.status(200).json({ gamePlayed });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
