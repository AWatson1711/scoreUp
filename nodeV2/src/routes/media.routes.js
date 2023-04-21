import { Router } from "express";
import { readOneMedia } from "../controllers/media/media.findOne.controller.js";
import { uploadImage } from "../controllers/media/media.upload.controller.js";
import { jwtMiddleware } from "../middlewares/auth.js";
import { upload } from "../middlewares/image.js";

const initMediaRoutes = (app, sm) => {
  const router = Router();
  router.get("/:id", sm, jwtMiddleware, readOneMedia);
  router.post(
    "/upload",
    sm,
    jwtMiddleware,
    upload.single("image"),
    uploadImage,
  );
  //   router.put("/update/:id", sm, jwtMiddleware, updateFriend);
  //   router.delete("/delete/:id", sm, jwtMiddleware, deleteFriend);
  app.use("/medias", router);
};

export default initMediaRoutes;
