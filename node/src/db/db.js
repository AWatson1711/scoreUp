// Importation de Sequelize
const { Sequelize } = require("sequelize");

// Créer une instance de Sequelize en passant les informations de connexion
const sequelize = new Sequelize("score_up", "root", "root", {
  host: "localhost",
  port: "8889",
  dialect: "mariadb",
  logging: false, // Désactiver la journalisation des requêtes SQL pour améliorer les performances
});

// Vérifier que la connexion à la base de données est réussie
sequelize
  .authenticate()
  .then((_) => console.log("La connexion à la bdd a réussi"))
  .catch((error) => console.error(error));

// Synchroniser les modèles de la base de données
sequelize
  .sync({ force: true })
  .then((_) => console.log("la methode sync a réussi"))
  .catch((error) => console.error(error));

module.exports = sequelize;
