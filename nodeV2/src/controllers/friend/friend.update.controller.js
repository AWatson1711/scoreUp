import { FriendDAO } from "../../daos/friend.dao.js";

export const updateFriend = async (req, res) => {
  try {
    const friendId = parseInt(req.params.id);
    const { userId, name, email, number } = req.body;

    // if (userId && userId !== FriendDAO.user_id) {
    //   return res.status(401).json({ error: "Access Denied" });
    // }
    const friend = await FriendDAO.updateById(friendId, name, email, number);
    if (friendId) {
      return res.json({
        message: `Friend ${name} updated successfuly`,
        data: friend,
      });
    } else {
      return res.status(404).json({ error: "Friend not found" });
    }
  } catch (e) {
    console.error(e.message);
    res.json(e.message);
  }
};
