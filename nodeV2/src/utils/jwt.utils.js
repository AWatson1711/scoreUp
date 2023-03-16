import jwt from "jsonwebtoken";
import { key } from "../config/key.js";
import { stringIsFilled } from "./string.utils.js";

const jwtOptions = {
  expiresIn: `28800000`, // 8h
};

export const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, key);
    const userId = decoded.data;
    return userId;
  } catch (err) {
    console.error(`jwtVerify: error => `, err);
    return null;
  }
};

export const jwtSign = (data) => jwt.sign({ data }, key, jwtOptions);
