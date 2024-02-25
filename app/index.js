require("dotenv-extended").config({ path: "./.env.development" });
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const registerRoutes = require("./registerRoutes");
const cors = require("cors");
const config = require("./config/config");
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
const sequelize = require("./db");

async function startServer() {
  try {
    console.log("[DEBUG] Establishing DB connection");
    sequelize
      .sync({ force: false })
      .then(() => console.log("[DEBUG] Established DB connection"));

    const modelsDir = path.join(__dirname, "model");

    fs.readdirSync(modelsDir).forEach((file) => {
      if (file.endsWith("model.js")) {
        const model = require(path.join(modelsDir, file));
        model(sequelize);
      }
    });

    registerRoutes(app);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(err.status || 500).send({ message: err.message });
    });

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("error:", error);
    process.exit(1);
  }
}

startServer();
