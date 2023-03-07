import { jwtVerify } from "../utils/jwt.utils";

// Exportation d'un middleware qui va vérifiée les tokens
export const jwtMiddleware = (req, res, next) => {
  // Vérifie si le header Authorization est présent dans la requête
  if (!req.headers.hasOwnProperty("authorization")) {
    return res.status(401).json({ error: "Token manquant" });
  }
  // Extrait le token de la requête HTTP
  const token = req.headers.authorization.split(" ")[1];
  const userId = jwtVerify(token);
  if (!userId) {
    return res.status(403).json({ message: "unauthorized" });
  }
  req.body = { ...req.body, userId };
  next();
};
