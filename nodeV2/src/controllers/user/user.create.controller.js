import { UserDAO } from "../../daos/user.dao.js";
import { jwtSign } from "../../utils/jwt.utils.js";
import bcrypt from "bcrypt";
import { USER_ROLE } from "../../constants/user.constants.js";
import { emailIsValid } from "../../utils/regex.utils.js";
import { passwordIsValid } from "../../utils/regex.utils.js";

export const signUp = async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    const number = req.body.number;
    const firstname = req.body.firstname;

    const user = UserDAO.findByEmail(email).then((element) => {
      if (element) {
        return res.status(409).json({ message: "Cette email est déjà pris" });
      }
      if (!emailIsValid(email)) {
        return res
          .status(409)
          .json({ message: "Cette email n'est pas conforme" });
      }
      if (!passwordIsValid(password)) {
        return res
          .status(409)
          .json({ message: "Ce password n'est pas conforme" });
      }

      bcrypt.hash(password, 10).then((hash) => {
        const user = UserDAO.create({
          name,
          firstname,
          email,
          number,
          password: hash,
          role_id: USER_ROLE.member,
        });

        const token = jwtSign(user.id);
        res.status(201).json({
          message: "user_created",
          name,
          firstname,
          email,
          number,
          token,
        });
      });
    });
  } catch (e) {
    console.error(e.message);
    res.json(e.message);
  }
};
