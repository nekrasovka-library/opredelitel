const express = require("express");
const { join } = require("node:path");
const router = require("./routes");
const setup = require("./middlewares/setup");

// Constants for paths
const FRONT_PATH = join(__dirname, "../../frontend/build");
const IMAGE_PATH = join(__dirname, "../../images");
const INDEX_HTML_PATH = join(FRONT_PATH, "index.html");

const app = express();

setup(app, {
  router,
  paths: {
    frontend: FRONT_PATH,
    images: IMAGE_PATH,
  },
});

// Serve index file
app.get("*", (req, res) => {
  res.sendFile(INDEX_HTML_PATH);
});

module.exports = app;
