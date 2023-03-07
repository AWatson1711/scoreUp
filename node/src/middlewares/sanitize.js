// On import escape de validator qui va permettre de protéger les chaînes de caractères contre les attaques XSS
import escape from "validator/lib/escape.js";
import { isString } from "../utils/string.utils.js";

// Cette fonction "sanitize" prend un objet en entrée et renvoie un nouvel objet où toutes les chaînes de caractères ont été échappées
const sanitize = (obj) => {
  // On récupère les clés de l'objet en paramètre
  const keys = Object.keys(obj);

  // On crée un nouvel objet "sanitized" en utilisant la méthode reduce
  // Cette méthode permet d'itérer sur chaque clé de l'objet et de créer un nouvel objet
  // où chaque chaîne de caractères est échappée grâce à la fonction "escape"
  const sanitized = keys.reduce((toBuild, key) => {
    const value = obj[key];
    const escaped = isString(value) ? escape(value) : value;
    return { ...toBuild, [key]: escaped };
  }, {});

  // On renvoie le nouvel objet "sanitized"
  return { ...sanitized };
};

// Cette fonction "sanitizeMiddleware" est un middleware Express qui échappe toutes les chaînes de caractères
export const sanitizeMiddleware = (req, res, next) => {
  // On échappe toutes les chaînes de caractères dans le corps de la requête
  req.body = sanitize(req.body);

  // On échappe toutes les chaînes de caractères dans les paramètres de la requête
  req.params = sanitize(req.params);

  // On appelle la fonction "next" pour passer à l'étape suivante du middleware
  next();
};
