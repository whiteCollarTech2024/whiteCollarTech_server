require("dotenv-extended").config({ path: `./.env.${process.env.NODE_ENV}` });
const pg = require("pg");
const express = require("express");
const fs = require("fs");
const path = require("path");
const config = require("./config/config");
const app = express();
const registerRoutes = require("./registerRoutes");
const sequelize = require("./db");
const cors = require("cors");
const constants = require("./constants");
app.use(
  cors({ origin: [constants.localFrontEndHost, constants.stagingFrontEndHost] })
);
app.use(express.json());

async function startServer() {
  try {
    console.log("[DEBUG] Establishing DB connection");

    // Create database if it doesn't exist

    const connectionString = config.database.connectionString;

    const client = new pg.Pool({
      connectionString: connectionString,
    });

    await client.connect();

    const modelsDir = path.join(__dirname, "model");

    fs.readdirSync(modelsDir).forEach((file) => {
      if (file.endsWith("model.js")) {
        const model = require(path.join(modelsDir, file));
        model(sequelize);
      }
    });

    await sequelize.authenticate();
    console.log("[DEBUG] Established DB connection");

    // Synchronize models
    await sequelize.sync();

    // Register routes
    registerRoutes(app);

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error("error:", error);
    process.exit(1);
  }
}

startServer();
