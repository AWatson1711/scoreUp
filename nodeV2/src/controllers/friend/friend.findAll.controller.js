import { FriendDAO } from "../../daos/friend.dao.js";

export const readFriends = async (req, res) => {
  const userId = req.body.userId;
  const friends = await FriendDAO.readAll(userId);
  if (!friends) {
    return res.status(400).json({ message: `can't retrieve friends` });
  }
  res.status(200).json({ friends });
};
