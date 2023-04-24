import { Router } from "express";
import { createStat } from "../controllers/stat/stat.create.controller.js";
import { deleteStat } from "../controllers/stat/stat.delete.controller.js";
import { readStat } from "../controllers/stat/stat.findAll.controller.js";
import { readOneStat } from "../controllers/stat/stat.findOne.controller.js";
import { updateStat } from "../controllers/stat/stat.update.controller.js";
import { jwtMiddleware } from "../middlewares/auth.js";

const initStatsRoutes = (app, sm) => {
  const router = Router();
  router.get("/", sm, jwtMiddleware, readStat);
  router.get("/:id", sm, jwtMiddleware, readOneStat);
  router.post("/create", sm, jwtMiddleware, createStat);
  router.put("/update/:id", sm, jwtMiddleware, updateStat);
  router.delete("/delete/:id", sm, jwtMiddleware, deleteStat);
  app.use("/stats", router);
};

export default initStatsRoutes;
