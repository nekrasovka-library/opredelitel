const express = require("express");
const cors = require("cors");
const expressStatic = express.static;

function setup(app, { router, paths }) {
  app.use(express.json()); // Парсер для JSON
  app.use(cors()); // CORS-защита
  app.use("/api", router); // Маршруты API
  app.use("/images", expressStatic(paths.images)); // Статические файлы из папки с изображениями
  app.use(expressStatic(paths.frontend)); // Статические файлы фронтенда
}

module.exports = setup;
