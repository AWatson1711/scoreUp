// Importation des types de données de Sequelize
import { DataTypes } from "sequelize";
import Media from "./Media.js";
import Friend from "./Friend.js";
import Game from "./Game.js";

// Importation de sequelize qui contient la connexion à la base de données
import sequelize from "../db/db.js";
import Stat from "./Stat.js";
import Game_played from "./Game_played.js";
import Role from "./Role.js";

// On Défini un modèle pour la table User
const User = sequelize.define(
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

User.hasMany(Media, {
  foreignKey: {
    allowNull: true,
    name: "user_id",
  },
  sourceKey: "id",
});

User.hasMany(Game, {
  foreignKey: {
    allowNull: true,
    name: "user_id",
  },
  sourceKey: "id",
});

User.hasMany(Stat, {
  foreignKey: {
    allowNull: true,
    name: "user_id",
  },
  sourceKey: "id",
});

User.hasMany(Game_played, {
  foreignKey: {
    allowNull: true,
    name: "user_id",
  },
  sourceKey: "id",
});

User.belongsTo(Role, {
  foreignKey: {
    allowNull: false,
    name: "role_id",
  },
});


export default User;
