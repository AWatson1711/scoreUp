import Media from "../models/Media.js";

const updateById = async (MediaId, name, path) => {
  try {
    const media = await Media.findByPk(MediaId);
    await media.update({ name, path });
    return media;
  } catch (error) {
    console.error(`media.dao - updateById : ${error.message}`);
  }
};

const readOne = async (MediaId) => {
  try {
    const media = await Media.findByPk(MediaId);
    return media;
  } catch (error) {
    console.error(`media.dao - readOne : ${error.message}`);
    return null;
  }
};

const deleteById = async (MediaId) => {
  try {
    const media = await Media.findByPk(MediaId);
    await media.destroy();
    return media;
  } catch (error) {
    console.error(`media.dao - readOne : ${error.message}`);
  }
};

const uploadMedia = async (name, path) => {
  try {
    Media.create(name, path);
  } catch (error) {
    console.error(`media.dao - uploadMedia : ${error.message}`);
  }
};

export const MediaDAO = {
  readOne,
  updateById,
  deleteById,
  uploadMedia,
};
