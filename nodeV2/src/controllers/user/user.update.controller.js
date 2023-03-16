import { UserDAO } from "../../daos/user.dao.js";

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, firstname, number, email, password } = req.body;
  try {
    const user = await UserDAO.updateById(
      userId,
      name,
      firstname,
      number,
      email,
      password,
    );
    if (userId) {
      return res.json({
        message: `Utilisateur ${name} ${firstname} modifier avec succès`,
        data: user,
      });
    }
    res.status(404).json({ error: "Utilisateur non trouvé" });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
