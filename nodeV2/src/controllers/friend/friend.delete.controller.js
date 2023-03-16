import { FriendDAO } from "../../daos/friend.dao.js";

export const deleteFriend = async (req, res) => {
  const friendId = parseInt(req.params.id);
  const userId = req.body.userId;
  try {
    if (userId && userId !== FriendDAO.user_id) {
      return res.status(401).json({ error: "Access Denied" });
    }
    const friend = await FriendDAO.deleteById(friendId);

    if (friend) {
      return res.json({
        message: `${friend.name} deleted successfuly`,
        data: friend,
      });
    } else {
      return res.status(404).json({ error: "Friend not found" });
    }
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
