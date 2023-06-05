import { FriendDAO } from "../../daos/friend.dao.js";
import Friend from "../../models/Friend.js";
import User from "../../models/User.js";
import { emailIsValid } from "../../utils/regex.utils.js";

export const addFriends = async (req, res) => {
  const { userId, name, email, number } = req.body;
  try {
    const existingFriend = await FriendDAO.findByEmail(email);
    if (existingFriend) {
      // Friend already exists, associate with user and return
      const user = await User.findByPk(userId);
      await user.addFriend(existingFriend);
      return existingFriend;
    } else {
      const friend = await FriendDAO.create(name, email, number, userId);
      res.status(201).json({
        message: "friend created",
        name,
        email,
        number,
      });
    }
    if (!emailIsValid(email)) {
      return res
        .status(409)
        .json({ message: "Cette email n'est pas conforme" });
    }
  } catch (e) {
    console.error(e.message);
    res.json(e.message);
  }
};


