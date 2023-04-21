import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer to store uploaded images in the 'uploads' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + extension);
  },
});

// Initialize multer middleware
export const upload = multer({ storage });
