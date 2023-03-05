// Importation des types de données de Sequelize
const { DataTypes } = require("sequelize");

// Importation de db qui contient la connexion à la base de données
const db = require("../db/db");

// On Défini un modèle pour la table User
const User = db.define(
  "User", // Nom de la table
  {
    // On Défini les champs de la table
    id: {
      type: DataTypes.INTEGER, // Type de données : nombre entier
      primaryKey: true, // Clé primaire de la table
      autoIncrement: true, // Auto-incrémenter la valeur de l'ID
    },
    name: {
      type: DataTypes.STRING(255), // Type de données : chaîne de caractères
      allowNull: false, // Ne pas autoriser les valeurs nulles
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        // La valeur de l'email doit être unique dans la table
        message: "Cette adresse e-mail est déjà utilisée",
      },
    },
    number: {
      type: DataTypes.INTEGER(13),
      allowNull: true, // Autoriser les valeurs nulles
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Ajouter des champs createdAt et updatedAt à la table
    createdAt: "created", // Nommer le champ createdAt "created"
    updatedAt: "updated", // Nommer le champ updatedAt "updated"
  },
);

module.exports = User;
