import { Router } from "express";
import { readGame } from "../controllers/game/game.findAll.controller.js";
import { readOneGame } from "../controllers/game/game.findOne.controller.js";
import { createGame } from "../controllers/game/game.create.controller.js";
import { updateGame } from "../controllers/game/game.update.controller.js";
import { deleteGame } from "../controllers/game/game.delete.controller.js";
import { jwtMiddleware } from "../middlewares/auth.js";

const initGamesRoutes = (app, sm) => {
  const router = Router();
  router.get("/", sm, jwtMiddleware, readGame);
  router.get("/:id", sm, jwtMiddleware, readOneGame);
  router.post("/addgame", sm, jwtMiddleware, createGame);
  router.put("/update/:id", sm, jwtMiddleware, updateGame);
  router.delete("/delete/:id", sm, jwtMiddleware, deleteGame);
  app.use("/games", router);
};

export default initGamesRoutes;
