import express from "express";
import initMiddlewares from "./src/middlewares/init.js";
import db from "./src/db/db.js";
import initRoutes from "./src/routes/router.js";
const app = express();
const port = process.env.PORT || 3003;

app.get("/", (req, res) => {
  res.send("ok");
});

initMiddlewares(app);
// initRoutes(app);

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
