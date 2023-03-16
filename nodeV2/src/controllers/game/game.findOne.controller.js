import { GameDAO } from "../../daos/game.dao.js";

export const readOneGame = async (req, res) => {
  const gameId = req.params.id;
  const userId = req.body.userId;
  try {
    if (userId && userId !== GameDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const games = await GameDAO.readOne(gameId);

    if (!games)
      return res.status(400).json({ message: `can't retrieve games` });
    res.status(200).json({ games });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
