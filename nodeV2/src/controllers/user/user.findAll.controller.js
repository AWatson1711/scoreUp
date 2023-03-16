import { UserDAO } from "../../daos/user.dao.js";

export const readUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const userByrole = await UserDAO.getRoleByUserId(userId);
    console.log(userByrole);
    if (userByrole !== "admin") {
      return res.status(403).json(`Unauthorized you're not a admin `);
    }
    const users = await UserDAO.readAll();
    if (!users)
      return res.status(400).json({ message: `can't retrieve users` });
    res.status(200).json({ users });
  } catch (error) {
    return res.status(403).json(`Unauthorized => ${error.message}`);
  }
};
