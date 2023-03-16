import { UserDAO } from "../../daos/user.dao.js";

export const readUser = async (req, res) => {
  const users = await UserDAO.readAll();
  if (!users) return res.status(400).json({ message: `can't retrieve users` });
  res.status(200).json({ users });
};
