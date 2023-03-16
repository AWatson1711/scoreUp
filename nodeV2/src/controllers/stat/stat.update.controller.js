import { StatDAO } from "../../daos/stat.dao.js";

export const updateStat = async (req, res) => {
  try {
    const statId = parseInt(req.params.id);
    const { victory, score, userId } = req.body;

    if (userId && userId !== StatDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const stat = await StatDAO.updateById(statId, victory, score);

    if (statId) {
      return res.json({
        message: `Stat updated successfuly`,
        data: stat,
      });
    } else {
      return res.status(404).json({ error: "Stat not found" });
    }
  } catch (e) {
    console.error(e.message);
    res.json(e.message);
  }
};
