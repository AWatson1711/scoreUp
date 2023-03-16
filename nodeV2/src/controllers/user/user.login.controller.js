import bcrypt from "bcrypt";
import { UserDAO } from "../../daos/user.dao.js";
import { jwtSign } from "../../utils/jwt.utils.js";

export const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await UserDAO.findByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ message: `Le user avec l'email ${email} n'existe pas` });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: `Le mot de passe est incorrect pour l'utilisateur ${email}`,
      });
    }
    if (user && isPasswordValid) {
      const token = jwtSign(user.id);
      res.status(200).json({
        message: "ok",
        token,
      });
    } else {
      res.status(401).json({ message: "login_failed" });
    }
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
};
