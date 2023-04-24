import Game_played from "../models/Game_played.js";
import Stat from "../models/Stat.js";

Stat.belongsTo(Game_played, {
  foreignKey: {
    allowNull: true,
    name: "game_played_id",
  },
  targetKey: "id",
});

Game_played.hasMany(Stat, {
  foreignKey: {
    allowNull: true,
    name: "game_played_id",
  },
  sourceKey: "id",
});

export { Game_played, Stat };
