import { UserDAO } from "../../daos/user.dao.js";

const admin = async (req, res) => {
  const userId = parseInt(req.params.id);
  const userID = req.body.userId;
  try {
    const userByrole = await UserDAO.getRoleByUserId(userID);
    console.log(userByrole);
    if (userByrole !== "admin") {
      return res.status(403).json(`Unauthorized you're not a admin `);
    }
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

const member = async (req, res) => {
  const userId = parseInt(req.params.id);
  const userID = req.body.userId;
  try {
    if (userID && userID !== UserDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
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

export const deleteUser = {
  admin,
  member,
};