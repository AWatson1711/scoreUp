import { UserDAO } from "../daos/user.dao.js";
import { jwtSign } from "../utils/jwt.utils.js";
import { stringIsFilled } from "../utils/string.utils.js";
import { omit, omitMulti } from "../utils/object.utils.js";

const signUp = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;
  const number = req.body.number;
  const firstname = req.body.firstname;

  const user = await UserDAO.create(name, firstname, email, password);
  if (!user) return res.status(403).json({ message: `email_already_exist` });

  const token = jwtSign(user.id);

  res
    .status(201)
    .json({ message: "user_created", user: omit(user, "password"), token });
};

const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!stringIsFilled(email) || !stringIsFilled(password)) {
    return res
      .status(404)
      .json({ message: "email or password is not correct" });
  }

  const user = await UserDAO.readByEmail(email);

  if (user && user.password === password) {
    const token = jwtSign(user.id);
    res.status(200).json({
      message: "ok",
      token,
    });
  } else {
    res.status(401).json({ message: "login_failed" });
  }
};

const read = async (req, res) => {
  const users = await UserDAO.readAll();
  if (!users) return res.status(400).json({ message: `can't retrieve users` });
  res.status(200).json({ users });
};

const getUserInfos = async (req, res) => {
  const { userId } = req.body;
  const user = await UserDAO.readById(userId);
  if (!user) return res.status(400).json({ message: `can't retrieve user` });
  res.status(200).json({ message: "OK" });
};

export const UserController = {
  signUp,
  read,
  signIn,
  getUserInfos,
};
