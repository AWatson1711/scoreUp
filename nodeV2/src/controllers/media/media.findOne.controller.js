import { MediaDAO } from "../../daos/media.dao.js";
import fs from "fs";

export const readOneMedia = async (req, res) => {
  const mediaId = parseInt(req.params.id);
  const userId = req.body.userId;

  try {
    // if (userId && userId !== MediaDAO.user_id) {
    //   return res.status(401).json({ error: "Access Denied" });
    // }
    const media = await MediaDAO.readOne(mediaId);

    if (!media) {
      res.status(404).json({ error: "Media not found" });
      return;
    }
    const imagePath = path.join(__dirname, "..", image.path);
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Unable to read image" });
        return;
      }
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve image" });
  }
};
