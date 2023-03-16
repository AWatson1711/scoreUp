import { GameDAO } from "../../daos/game.dao.js";

export const createGame = async (req, res) => {
  try {
    const { userId, name } = req.body;
    const game = await GameDAO.create({
      name,
      //   UserId on devra aller le chercher quand on regardera pour le token
      user_id: userId,
    });
    if (!userId) {
      return res.status(400).json({ message: "User not identified" });
    }
    res.status(201).json({
      message: "game_created",
      name,
    });
  } catch (e) {
    console.error(e.message);
  }
};
