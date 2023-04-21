import { Router } from "express";
import { createGamePlayed } from "../controllers/gamePlayed/gamePlayed.create.controller.js";
import { deleteGamePlayed } from "../controllers/gamePlayed/gamePlayed.delete.controller.js";
import { readGamePlayed } from "../controllers/gamePlayed/gamePlayed.findAll.controller.js";
import { readOneGamePlayed } from "../controllers/gamePlayed/gamePlayed.findOne.controller.js";
import { updateGamePlayed } from "../controllers/gamePlayed/gamePlayed.update.controller.js";
import { jwtMiddleware } from "../middlewares/auth.js";

const initGamesPlayedRoutes = (app, sm) => {
  const router = Router();
  router.get("/", sm, jwtMiddleware, readGamePlayed);
  router.get("/:id", sm, jwtMiddleware, readOneGamePlayed);
  router.post("/create", sm, jwtMiddleware, createGamePlayed);
  router.put("/update/:id", sm, jwtMiddleware, updateGamePlayed);
  router.delete("/delete/:id", sm, jwtMiddleware, deleteGamePlayed);
  app.use("/gamesplayed", router);
};

export default initGamesPlayedRoutes;
