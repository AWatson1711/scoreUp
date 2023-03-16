import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const initMiddlewares = (app) => {
  const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Origine non autorisée par CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };

  app
    .use(bodyParser.json())
    //helmet -> middleware pour aider a proteger contre les injections de script, les attaques XSS, les en-têtes HTTP malveillants, etc.
    .use(helmet())
    //delimite l'acces aux endpoints
    .use(cors(corsOptions))
    .use(cookieParser());
};

export default initMiddlewares;
