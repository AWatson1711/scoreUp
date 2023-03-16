import { Router } from "express";
// import { jwtMiddleware } from "../middlewares/auth.js";
import { UserController } from "../controllers/user.controllers.js";

const initUsersRoutes = (app, sm) => {
  const router = Router();
  router.post("/sign-up", sm, UserController.signUp);
  app.use("/users", router);
};

export default initUsersRoutes;
