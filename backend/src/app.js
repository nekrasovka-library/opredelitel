const express = require("express");
const { join } = require("node:path");
const router = require("./routes");
const setup = require("./middlewares/setup");

// Constants for paths
const PATH_TO_FRONTEND = join(__dirname, "../../frontend/build");
const PATH_TO_IMAGES = join(__dirname, "../../images");
const INDEX_HTML_PATH = join(PATH_TO_FRONTEND, "index.html");

const app = express();

setup(app, {
  router,
  paths: {
    frontend: PATH_TO_FRONTEND,
    images: PATH_TO_IMAGES,
  },
});

// Serve index file
app.get("*", (req, res) => {
  res.sendFile(INDEX_HTML_PATH);
});

module.exports = app;
