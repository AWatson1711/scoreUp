import { GamePlayedDAO } from "../../daos/gamePlayed.dao.js";

export const updateGamePlayed = async (req, res) => {
  try {
    const gamePlayedId = parseInt(req.params.id);
    const { comment, gameName, userId } = req.body;

    // if (userId && userId !== GamePlayedDAO.user_id) {
    //   return res.status(401).json({ error: "Access Denied" });
    // }
    const gamePlayed = await GamePlayedDAO.updateById(
      gamePlayedId,
      comment,
      gameName,
    );

    if (gamePlayedId) {
      return res.json({
        message: `GamePlayed ${gameName} updated successfuly`,
        data: gamePlayed,
      });
    } else {
      return res.status(404).json({ error: "GamePlayed not found" });
    }
  } catch (e) {
    console.error(e.message);
    res.json(e.message);
  }
};
