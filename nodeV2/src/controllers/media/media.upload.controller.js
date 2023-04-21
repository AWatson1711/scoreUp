import { MediaDAO } from "../../daos/media.dao.js";
import fs from "fs";

export const uploadImage = async (req, res) => {
  const { userId, name, path } = req.body;
  console.log(userId);
  try {
    const image = await MediaDAO.uploadMedia({
      name: req.file.originalname,
      path: req.file.path,
      user_id: userId,
    });
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to upload image" });
  }
};
