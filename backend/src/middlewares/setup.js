const express = require("express");
const cors = require("cors");
const { join } = require("node:path");
const favicon = require("serve-favicon");
const expressStatic = express.static;

function setup(app, { router, paths }) {
  app.use(express.json()); // Парсер для JSON
  app.use(cors()); // CORS-защита
  app.use("/opredelitel/api", router); // Маршруты API
  app.use("/opredelitel/images", expressStatic(paths.images)); // Статические файлы из папки с изображениями
  app.use(expressStatic(paths.frontend)); // Статические файлы фронтенда
  app.use(favicon(join(__dirname, "../../../frontend/build", "favicon.ico")));
}

module.exports = setup;
