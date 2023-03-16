import User from "../models/User.js";
import { regexIsOk } from "../utils/regex.utils.js";

const create = async (name, firstname, email, number, password) => {
  let result = null;
  try {
    User.create(name, firstname, email, number, password);
  } catch (error) {
    console.error({ message: error.message });
  }
};

export const UserDAO = {
  create: create,
};
