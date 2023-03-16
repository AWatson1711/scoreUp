import { Router } from "express";
import { jwtMiddleware } from "../middlewares/auth.js";
import { signUp } from "../controllers/user/user.create.controller.js";
import { signIn } from "../controllers/user/user.login.controller.js";
import { deleteUser } from "../controllers/user/user.delete.controller.js";
import { updateUser } from "../controllers/user/user.update.controller.js";
import { readUser } from "../controllers/user/user.findAll.controller.js";
import { userProfil } from "../controllers/user/user.findOne.controller.js";

const initUsersRoutes = (app, sm) => {
  const router = Router();
  router.get("/", sm, readUser);
  router.get("/profil", jwtMiddleware, sm, userProfil);
  router.post("/sign-up", sm, signUp);
  router.post("/sign-in", sm, signIn);
  router.delete("/delete/:id", sm, deleteUser);
  router.put("/update/:id", sm, updateUser);
  app.use("/users", router);
};

export default initUsersRoutes;
