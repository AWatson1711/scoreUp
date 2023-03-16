import initUsersRoutes from "./user.routes.js";
import { sanitizeMiddleware } from "../middlewares/sanitize.js";

import {GetUserBasicInfos} from './user'

const initRoutes = (app) => {
  initUsersRoutes(app, sanitizeMiddleware);
};

export default initRoutes;
