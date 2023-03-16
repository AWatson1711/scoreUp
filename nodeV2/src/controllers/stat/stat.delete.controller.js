import { StatDAO } from "../../daos/stat.dao.js";

export const deleteStat = async (req, res) => {
  const statId = parseInt(req.params.id);
  const userId = req.body.userId;
  try {
    if (userId && userId !== StatDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const stat = await StatDAO.deleteById(statId);

    if (stat) {
      return res.json({
        message: `Stat deleted successfuly`,
        data: stat,
      });
    } else {
      return res.status(404).json({ error: "Stat not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
