// Importation de JSON Web Token
import jwt from "jsonwebtoken";
// Importation de la clé privée pour la vérification des tokens
import { key } from "../config/key";
import { stringIsFilled } from "./string.utils";

// Importation de la fonction promisify d'util qui se trouvve dans Node.js
import { promisify } from "util";

// La fonction verifyToken renvoie un token verifier
const verifyToken = promisify(jwt.verify);

const jwtOptions = {
  expiresIn: `8h`,
};

export const jwtVerify = async (token) => {
  try {
    // Décode le token avec la clé privée
    const decodedToken = await verifyToken(token, key);

    // usersId est l'ID utilisateur à partir du token
    const userId = decodedToken.data;

    // Vérifie si l'ID utilisateur dans le corps de la requête correspond à l'ID utilisateur dans le token
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({ error: "ID utilisateur invalide" });
    }

    // la fonction next() permet pour passer au middleware suivant
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Token invalide" });
  }
};

export const jwtSign = (data) => jwt.sign({ data }, key, jwtOptions);
