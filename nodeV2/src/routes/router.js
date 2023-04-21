import initUsersRoutes from "./user.routes.js";
import initGamesRoutes from "./game.routes.js";
import { sanitizeMiddleware } from "../middlewares/sanitize.js";
import initFriendsRoutes from "./friend.routes.js";
import initStatsRoutes from "./stat.routes.js";
import initGamesPlayedRoutes from "./gamePlayed.routes.js";
import initMediaRoutes from "./media.routes.js";

const initRoutes = (app) => {
  initUsersRoutes(app, sanitizeMiddleware);
  initGamesRoutes(app, sanitizeMiddleware);
  initFriendsRoutes(app, sanitizeMiddleware);
  initStatsRoutes(app, sanitizeMiddleware);
  initGamesPlayedRoutes(app, sanitizeMiddleware);
  initMediaRoutes(app, sanitizeMiddleware);
};

export default initRoutes;
