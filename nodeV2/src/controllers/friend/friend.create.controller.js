import { FriendDAO } from "../../daos/friend.dao.js";
import { emailIsValid } from "../../utils/regex.utils.js";

export const addFriends = async (req, res) => {
  const { userId, name, email, number } = req.body;
  try {
    await FriendDAO.findByEmail(email).then((element) => {
      if (element) {
        return res.status(409).json({ message: "Cette email est déjà utlisé" });
      }
      if (!emailIsValid(email)) {
        return res
          .status(409)
          .json({ message: "Cette email n'est pas conforme" });
      }
      const friend = FriendDAO.create({
        name,
        email,
        number,
        //   Ici aussi il faut le token pour trouver le userId
        user_id: userId,
      });
    });
    res.status(201).json({
      message: "friend created",
      name,
      email,
      number,
    });
  } catch (e) {
    console.error(e.message);
    res.json(e.message);
  }
};
