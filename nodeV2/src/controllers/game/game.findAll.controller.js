import { GameDAO } from "../../daos/game.dao.js";

export const readGame = async (req, res) => {
  const userId = req.body.userId;
  const games = await GameDAO.readAll(userId);
  if (!games) return res.status(400).json({ message: `can't retrieve games` });
  res.status(200).json({ games });
};
