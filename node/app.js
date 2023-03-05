const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./src/db/db");
const User = require("./src/models/User");
const Game = require("./src/models/Game");
const Stat = require("./src/models/Stat");
const Role = require("./src/models/Role");
const Friend = require("./src/models/Friend");

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
