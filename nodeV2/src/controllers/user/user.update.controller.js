import { UserDAO } from "../../daos/user.dao.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, firstname, number, email, password } = req.body;
  const hashPassword = (password) => {
    const hash = bcrypt.hash(password, 10);
    return hash;
  };
  try {
    const userFound = await UserDAO.readById(id);
    if (!userFound) return res.status(403).json({ message: `user_not_found` });
    if (password) {
      password = await hashPassword(password);
    }
    const user = await UserDAO.updateById(
      id,
      name,
      firstname,
      number,
      email,
      password,
    );

    res.status(200).json({
      message: "user_updated",
      user: {
        id: user.id,
        name,
        firstname,
        email,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
