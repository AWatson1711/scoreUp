import { FriendDAO } from "../../daos/friend.dao.js";

export const readOneFriends = async (req, res) => {
  const friendId = parseInt(req.params.id);
  const userId = req.body.userId;
  try {
    // if (userId && userId !== FriendDAO.user_id) {
    //   return res.status(401).json({ error: "Access Denied" });
    // }
    const friends = await FriendDAO.readOne(friendId);

    if (!friends)
      return res.status(400).json({ message: `can't retrieve friends` });
    res.status(200).json({ friends });
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
