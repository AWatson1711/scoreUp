import { GameDAO } from "../../daos/game.dao.js";

export const deleteGame = async (req, res) => {
  const gameId = parseInt(req.params.id);
  const userId = req.body.userId;
  try {
    if (userId && userId !== GameDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const game = await GameDAO.deleteById(gameId);

    if (game) {
      return res.json({
        message: `${game.name} deleted successfuly`,
        data: game,
      });
    } else {
      return res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
