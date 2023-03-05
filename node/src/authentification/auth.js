// Importation de JSON Web Token
const jwt = require("jsonwebtoken");

// Importation de la fonction promisify d'util qui se trouvve dans Node.js
const { promisify } = require("util");

// Importation de la clé privée pour la vérification des tokens
const privateKey = require("./key");

// La fonction verifyToken renvoie un token verifier
const verifyToken = promisify(jwt.verify);

// Exportation d'un middleware qui va vérifiée les tokens
module.exports = async (req, res, next) => {
  // Vérifie si le header Authorization est présent dans la requête
  if (!req.headers.hasOwnProperty("authorization")) {
    return res.status(401).json({ error: "Token manquant" });
  }

  // Extrait le token de la requête HTTP
  const token = req.headers.authorization.split(" ")[1];

  try {
    // Décode le token avec la clé privée
    const decodedToken = await verifyToken(token, privateKey);

    // usersId est l'ID utilisateur à partir du token
    const userId = decodedToken.userId;

    // Vérifie si l'ID utilisateur dans le corps de la requête correspond à l'ID utilisateur dans le token
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({ error: "ID utilisateur invalide" });
    }

    // la fonction next() permet pour passer au middleware suivant
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Token invalide" });
  }
};
