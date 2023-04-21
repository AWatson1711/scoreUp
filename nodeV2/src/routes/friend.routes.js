import { Router } from "express";
import { addFriends } from "../controllers/friend/friend.create.controller.js";
import { deleteFriend } from "../controllers/friend/friend.delete.controller.js";
import { readFriends } from "../controllers/friend/friend.findAll.controller.js";
import { readOneFriends } from "../controllers/friend/friend.findOne.controller.js";
import { updateFriend } from "../controllers/friend/friend.update.controller.js";
import { jwtMiddleware } from "../middlewares/auth.js";

const initFriendsRoutes = (app, sm) => {
  const router = Router();
  router.get("/", sm, jwtMiddleware, readFriends);
  router.get("/:id", sm, jwtMiddleware, readOneFriends);
  router.post("/create", sm, jwtMiddleware, addFriends);
  router.put("/update/:id", sm, jwtMiddleware, updateFriend);
  router.delete("/delete/:id", sm, jwtMiddleware, deleteFriend);
  app.use("/friends", router);
};

export default initFriendsRoutes;
