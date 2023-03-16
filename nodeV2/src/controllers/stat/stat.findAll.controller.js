import { StatDAO } from "../../daos/stat.dao.js";

export const readStat = async (req, res) => {
  const userId = req.body.userId;
  const stats = await StatDAO.readAll(userId);
  if (!stats) return res.status(400).json({ message: `can't retrieve stats` });
  res.status(200).json({ stats });
};
