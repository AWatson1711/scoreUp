import { UserDAO } from "../../daos/user.dao.js";

export const userProfil = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserDAO.readById(userId);
    if (!user) return res.status(400).json({ message: `can't retrieve user` });
    res.status(200).json({ user });
  } catch (e) {
    console.error(e.message);
  }
};
