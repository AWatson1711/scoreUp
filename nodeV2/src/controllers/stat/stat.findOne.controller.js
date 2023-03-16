import { StatDAO } from "../../daos/stat.dao.js";

export const readOneStat = async (req, res) => {
  const statId = parseInt(req.params.id);
  const userId = req.body.userId;
  try {
    if (userId && userId !== StatDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const stats = await StatDAO.readOne(statId);

    if (!stats)
      return res.status(400).json({ message: `can't retrieve stats` });
    res.status(200).json({ stats });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
