import { GamePlayedDAO } from "../../daos/gamePlayed.dao.js";

export const readGamePlayed = async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  const gamePlayed = await GamePlayedDAO.readAll(userId);
  if (!gamePlayed)
    return res.status(400).json({ message: `can't retrieve game played` });
  res.status(200).json({ gamePlayed });
};
