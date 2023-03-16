import { GameDAO } from "../../daos/game.dao.js";

export const updateGame = async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    const userId = req.body.userId;
    const name = req.body.name;

    if (userId && userId !== GameDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const game = await GameDAO.updateById(gameId, name);

    if (gameId) {
      return res.json({
        message: `Game ${name} updated successfuly`,
        data: game,
      });
    } else {
      return res.status(404).json({ error: "Game not found" });
    }
  } catch (e) {
    console.error(e.message);
    res.json(e.message);
  }
};
