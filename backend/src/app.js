const express = require("express");
const { join } = require("node:path");
const cors = require("cors");
const router = require("./routes");

// Constants for paths
const PATH_TO_FRONTEND = join(__dirname, "../../frontend/build");
const PATH_TO_IMAGES = join(__dirname, "../../images");
const INDEX_HTML_PATH = join(PATH_TO_FRONTEND, "index.html");

const app = express();

// Function to set up middlewares
function setupMiddlewares(app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api", router);
  app.use("/images", express.static(PATH_TO_IMAGES));
  app.use(express.static(PATH_TO_FRONTEND));
}

setupMiddlewares(app);

// Serve index file
app.get("*", (req, res) => {
  res.sendFile(INDEX_HTML_PATH);
});

module.exports = app;
