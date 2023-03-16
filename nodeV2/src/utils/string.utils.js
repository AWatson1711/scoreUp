// On vérifie si le type de "data" est une chaîne de caractères (string)
export const isString = (data) => typeof data === "string";

// On vérifie si "data" est une chaîne de caractères remplie (non vide)
// Elle appelle la fonction "isString" pour s'assurer que "data" est une chaîne de caractères,
// On utilise la méthode trim pour supprimé les espaces avant et après puis vérifie si sa longueur est supérieure à 0
export const stringIsFilled = (data) =>
  isString(data) && data.trim().length > 0;
