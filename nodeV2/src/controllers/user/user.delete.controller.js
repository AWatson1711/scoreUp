import { UserDAO } from "../../daos/user.dao.js";

export const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await UserDAO.deleteById(userId);
    if (user) {
      res.json({
        message: `Utilisateur ${user.email} supprimé avec succès`,
        data: user,
      });
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
